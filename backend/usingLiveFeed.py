import cv2
import mediapipe as mp
import time
import numpy as np
import math

def DrawCircles(frame,pointsList, p1,p2,p3):
    x1,y1 = pointsList[p1][1:]
    x2,y2 = pointsList[p2][1:]
    x3,y3 = pointsList[p3][1:]

    cv2.circle(frame, (x1,y1), 20, (255,0,0), cv2.FILLED)
    cv2.circle(frame, (x2,y2), 20, (255,0,0), cv2.FILLED)
    cv2.circle(frame, (x3,y3), 20, (255,0,0), cv2.FILLED)
    

def drawLines(frame,pointsList, p1,p2,p3):
    x1,y1 = pointsList[p1][1:]
    x2,y2 = pointsList[p2][1:]
    x3,y3 = pointsList[p3][1:]

    cv2.line(frame,(x1,y1),(x2,y2),(0,255,0),5)
    cv2.line(frame,(x2,y2),(x3,y3),(0,255,0),5)

def findAngles(frame, pointsList, p1,p2,p3):
    x1,y1 = pointsList[p1][1:]
    x2,y2 = pointsList[p2][1:]
    x3,y3 = pointsList[p3][1:]

    angle = math.degrees(math.atan2(y1-y2, x1-x2)-math.atan2(y3-y2,x3-x2))

    if angle<0:
        angle+=360
    if angle > 180:
        angle = 360 - angle
    
    cv2.putText(frame, str(int(angle)), (x2 - 20,y2 + 50), cv2.FONT_HERSHEY_PLAIN,3,(255,0,255),3)

    return angle


    



def rescaleFunc(frame, scale=1):
    width = int(frame.shape[1]*scale)
    height= int(frame.shape[0]*scale)
    dimension = (width,height)
    rescale = cv2.resize(frame,dimension, interpolation=cv2.INTER_AREA)
    
    return rescale

mpDraw = mp.solutions.drawing_utils
mpPose = mp.solutions.pose
#creatingObject
pose = mpPose.Pose()

cap = cv2.VideoCapture(0)
pTime = 0

exerciseType = input("Enter the exercise you are doing:\n 1 for bicep curls\n2 for squats\n3 for pushups")
if (int(exerciseType)==1):
    arm = input("Pls enter the arm you want to train:\n1. for right arm\n2 for left arm:\n")


#bicepCount
bCount=0
bDir=0

#left bicep
blCount=0
blDir=0

#squats
sCount=0
sDir=0

#pushupsCount
pCount=0
pDir=0

while True:
    ret, frame = cap.read()
    if not ret:
        break
    frame = cv2.flip(frame, 1)
    rgb_img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(rgb_img)

    #print(results.pose_landmarks)
    pointsList = []
    if results.pose_landmarks:
        #mpDraw.draw_landmarks(frame, results.pose_landmarks, mpPose.POSE_CONNECTIONS)
        for id, lm in enumerate(results.pose_landmarks.landmark):
            h,w,c = frame.shape
            cx, cy = int(lm.x*w), int(lm.y*h)
            pointsList.append([id,cx,cy])
            #cv2.circle(frame, (cx,cy), 6, (255,0,0), cv2.FILLED)

        if int(exerciseType) == 1:
            if int(arm)==1:
                #right arm   
                DrawCircles(frame,pointsList,11,13,15)
                drawLines(frame,pointsList,11,13,15)
                angle = findAngles(frame,pointsList, 11,13,15)
                per = np.interp(angle,(55,155),(100,0))

                if per>95:
                    if bDir==0:
                        bCount+=0.5
                        bDir = 1
                if per<5:
                    if bDir==1:
                        bCount+=0.5
                        bDir = 0 
                bicepCount = f"Bicep count: {str(int(bCount))}"
                cv2.putText(frame,bicepCount,(100,50), cv2.FONT_HERSHEY_PLAIN, 2, (255,0,255),2)
            #left arm
            elif int(arm)==2:
                DrawCircles(frame,pointsList,12,14,16)
                drawLines(frame,pointsList,12,14,16)
                angle = findAngles(frame,pointsList, 12,14,16)
                per = np.interp(angle, (50,165), (0,100))

                if per==100:
                    if blDir==0:
                        blCount+=0.5
                        blDir=1
                if per==0:
                    if blDir==1:
                        blCount+=0.5
                        blDir=0
                bicepCount = f"Bicep count: {str(int(blCount))}"
                cv2.putText(frame,bicepCount,(100,50), cv2.FONT_HERSHEY_PLAIN, 2, (255,0,255),2)
                
        
        elif int(exerciseType)==2:
            DrawCircles(frame,pointsList,23,25,27)
            drawLines(frame,pointsList,23,25,27)
            angle = findAngles(frame,pointsList,23,25,27)
            per = np.interp(angle,(90,170),(0,100))
                
                
            #counting Reps
            if per==100:
                if sDir==0:
                    sCount+=0.5
                    sDir=1
            if per==0:
                if sDir==1:
                    sCount+=0.5
                    sDir=0
            squatCount = f'Rep count: {str(int(sCount))}'

            cv2.putText(frame,squatCount,(150,50), cv2.FONT_HERSHEY_PLAIN,4,(0,255,0),4)
                
        elif int(exerciseType)==3:
            DrawCircles(frame,pointsList,11,13,15)
            DrawCircles(frame,pointsList,11,23,25)
            drawLines(frame,pointsList,11,13,15)
            drawLines(frame,pointsList,11,23,25)
            angles = findAngles(frame,pointsList,11,13,15)
            per = np.interp(angles,(62,165),(0,100))

            if per==100:
                if pDir==0:
                    pCount+=0.5
                    pDir=1
            if per==0:
                if pDir==1:
                    pCount+=0.5
                    pDir=0
            pushupsCount = f'Rep count: {str(int(pCount))}'
            cv2.putText(frame,pushupsCount,(150,50), cv2.FONT_HERSHEY_PLAIN,4,(0,255,0),4)

    #fps
    cTime = time.time()
    fps = 1/(cTime-pTime)
    pTime = cTime

    cv2.putText(frame, str(int(fps)), (60,50), cv2.FONT_HERSHEY_PLAIN, 2, (255,0,0), 2)
    frame_resize = rescaleFunc(frame)
    cv2.imshow('Image', frame_resize)
    if cv2.waitKey(1) & 0xFF==ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
