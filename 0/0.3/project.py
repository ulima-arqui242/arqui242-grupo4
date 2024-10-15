#import libraries
import cv2 #vidio capture, image processing and visualization (openCV)
import mediapipe as mp #hand detection
import numpy as np # math operations 
from math import acos, degrees #calculate angles

# function that computes the center of the palm by calculating the mean of the coordinates
def palm_centerid(coordinates_list):
     coordinates = np.array(coordinates_list)
     centerid = np.mean(coordinates, axis=0)
     centerid = int(centerid[0]), int(centerid[1])
     return centerid

# define mediapipe
mp_drawing = mp.solutions.drawing_utils #visualize the hand landmarks
mp_drawing_styles = mp.solutions.drawing_styles #default styles for drawing
mp_hands = mp.solutions.hands #hand detection and drawing

#captures video from the default camera
cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

#landmark points
# indices to identify the thumb position
thumb_points = [1, 2, 4]
#indices of landmarks for the palm
palm_points = [0, 1, 2, 5, 9, 13, 17]
# index, middle, ring & pinkie
fingertips_points = [8, 12, 16, 20]
#indices for the base of each finger
finger_base_points =[6, 10, 14, 18]

# colours definition 
GREEN = (48, 255, 48)
BLUE = (192, 101, 21)
YELLOW = (0, 204, 255)
PURPLE = (128, 64, 128)
PEACH = (180, 229, 255)
WITHE = (255, 255, 255)

# hand detection
with mp_hands.Hands(
     model_complexity=1,
     max_num_hands=1, #detects one hand
     min_detection_confidence=0.5, #confidence of detecting one hand
     min_tracking_confidence=0.5) as hands: #confidence of tracking one hand

     #main loop
     while True:
          ret, frame = cap.read()
          if ret == False:
               break
          frame = cv2.flip(frame, 1) #mirrors the camara 
          height, width, _ = frame.shape
          frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) #frame from bgr to rgb
          results = hands.process(frame_rgb)
          fingers_counter = "."
          thickness = [2, 2, 2, 2, 2]

          #processing hand landmarks 
          #if a hand is detected, extracts the landmarks for the thumb, palm fingertips and finger bases (separate lists)
          if results.multi_hand_landmarks:
               coordinates_thumb = []
               coordinates_palm = []
               coordinates_ft = []
               coordinates_fb = []
               for hand_landmarks in results.multi_hand_landmarks:
                    for index in thumb_points:
                         x = int(hand_landmarks.landmark[index].x * width)
                         y = int(hand_landmarks.landmark[index].y * height)
                         coordinates_thumb.append([x, y])
                    
                    for index in palm_points:
                         x = int(hand_landmarks.landmark[index].x * width)
                         y = int(hand_landmarks.landmark[index].y * height)
                         coordinates_palm.append([x, y])
                    
                    for index in fingertips_points:
                         x = int(hand_landmarks.landmark[index].x * width)
                         y = int(hand_landmarks.landmark[index].y * height)
                         coordinates_ft.append([x, y])
                    
                    for index in finger_base_points:
                         x = int(hand_landmarks.landmark[index].x * width)
                         y = int(hand_landmarks.landmark[index].y * height)
                         coordinates_fb.append([x, y])
                   
                    #thumb angle calculation
                    p1 = np.array(coordinates_thumb[0])
                    p2 = np.array(coordinates_thumb[1])
                    p3 = np.array(coordinates_thumb[2])

                    l1 = np.linalg.norm(p2 - p3)
                    l2 = np.linalg.norm(p1 - p3)
                    l3 = np.linalg.norm(p1 - p2)

                    # calculate angles
                    angle = degrees(acos((l1**2 + l3**2 - l2**2) / (2 * l1 * l3)))
                    thumb_finger = np.array(False)
                    if angle > 150: #if the angle is > 150 the thumb is up
                         thumb_finger = np.array(True)
                    
                    
                    # index, middle, ring & pinkie fingers detection
                    nx, ny = palm_centerid(coordinates_palm)
                    cv2.circle(frame, (nx, ny), 3, (0, 255, 0), 2)
                    coordinates_centerid = np.array([nx, ny])
                    coordinates_ft = np.array(coordinates_ft)
                    coordinates_fb = np.array(coordinates_fb)

                    # distance
                    d_centrid_ft = np.linalg.norm(coordinates_centerid - coordinates_ft, axis=1)
                    d_centrid_fb = np.linalg.norm(coordinates_centerid - coordinates_fb, axis=1)
                    dif = d_centrid_ft - d_centrid_fb
                    fingers = dif > 0
                    fingers = np.append(thumb_finger, fingers)
                    fingers_counter = str(np.count_nonzero(fingers==True))
                    
                    #drawing finger state
                    for (i, finger) in enumerate(fingers):
                         if finger == True:
                              thickness[i] = -1

                    mp_drawing.draw_landmarks(
                         frame,
                         hand_landmarks,
                         mp_hands.HAND_CONNECTIONS,
                         mp_drawing_styles.get_default_hand_landmarks_style(),
                         mp_drawing_styles.get_default_hand_connections_style())
          
          # visualization
          cv2.rectangle(frame, (0, 0), (80, 80), (125, 220, 0), -1)
          cv2.putText(frame, fingers_counter,(15, 65), 1, 5, WITHE, 2)
          # thumb
          cv2.rectangle(frame, (100, 10), (150, 60), PEACH, thickness[0])
          cv2.putText(frame, "thumb", (100, 80), 1, 1, WITHE, 2)
          # index
          cv2.rectangle(frame, (160, 10), (210, 60), PURPLE, thickness[1])
          cv2.putText(frame, "index", (160, 80), 1, 1, WITHE, 2)
          # middle
          cv2.rectangle(frame, (220, 10), (270, 60), YELLOW, thickness[2])
          cv2.putText(frame, "middle", (220, 80), 1, 1, WITHE, 2)
          # ring
          cv2.rectangle(frame, (280, 10), (330, 60), GREEN, thickness[3])
          cv2.putText(frame, "ring", (280, 80), 1, 1, WITHE, 2)
          # pinkie
          cv2.rectangle(frame, (340, 10), (390, 60), BLUE, thickness[4])
          cv2.putText(frame, "pinkie", (340, 80), 1, 1, WITHE, 2)

          cv2.imshow("Frame", frame)
          if cv2.waitKey(1) & 0xFF == 27: #ASCII code for escape 
               break
cap.release()
cv2.destroyAllWindows()