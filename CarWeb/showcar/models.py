from django.db import models

# Create your models here.

class message(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=15)

class ZnjCarcrossinfotbl20211216124301(models.Model):

    hmsms = models.IntegerField(db_column='HMSMS', primary_key=True)  # Field name made lowercase.

    carid = models.IntegerField(db_column='CarId')  # Field name made lowercase.

    crossnumber = models.IntegerField(db_column='CrossNumber')  # Field name made lowercase.

    crossdir = models.IntegerField(db_column='CrossDir')  # Field name made lowercase.

    passtime = models.CharField(db_column='PassTime', max_length=100)  # Field name made lowercase.



    class Meta:

        managed = False

        db_table = 'znj_carcrossinfotbl20211216124301'





class ZnjCarcrossinfotbl20211216135710(models.Model):

    hmsms = models.IntegerField(db_column='HMSMS', primary_key=True)  # Field name made lowercase.

    carid = models.IntegerField(db_column='CarId')  # Field name made lowercase.

    crossnumber = models.IntegerField(db_column='CrossNumber')  # Field name made lowercase.

    crossdir = models.IntegerField(db_column='CrossDir')  # Field name made lowercase.

    passtime = models.CharField(db_column='PassTime', max_length=100)  # Field name made lowercase.

    class Meta:

        managed = False

        db_table = 'znj_carcrossinfotbl20211216135710'





class ZnjCarstatustbl20211216135710(models.Model):

    hmsms = models.IntegerField(db_column='HMSMS', primary_key=True)  # id

    carid = models.IntegerField(db_column='CarID')  # 车辆编号

    steerangle = models.SmallIntegerField(db_column='SteerAngle')  # 转向角

    pwm_signal = models.SmallIntegerField(db_column='PWM_Signal')  # 脉冲宽度调制

    carspeed = models.SmallIntegerField(db_column='CarSpeed')  # 车速

    agvpos1 = models.IntegerField(db_column='AGVPos1')  # 自动导航条1

    agvpos2 = models.IntegerField(db_column='AGVPos2')  # 2

    infrared1 = models.SmallIntegerField(db_column='InFraRed1')  # 红外装置1

    infrared2 = models.SmallIntegerField(db_column='InFraRed2')  # 2

    infrared3 = models.SmallIntegerField(db_column='InFraRed3')  # 3

    infrared4 = models.SmallIntegerField(db_column='InFraRed4')  # 4

    infrared5 = models.SmallIntegerField(db_column='InFraRed5')  # 5

    infrared6 = models.SmallIntegerField(db_column='InFraRed6')  # 6

    energy = models.SmallIntegerField(db_column='Energy')  # 电量

    rfidcardno = models.BigIntegerField(db_column='RFIDCardNo')  # RFID编号

    rxlen = models.BigIntegerField(db_column='RxLen')  # 串口数据

    jiuzhou1 = models.SmallIntegerField(db_column='JiuZhou1')  # Field name made lowercase.

    jiuzhou2 = models.SmallIntegerField(db_column='JiuZhou2')  # Field name made lowercase.

    jiuzhou3 = models.SmallIntegerField(db_column='JiuZhou3')  # Field name made lowercase.

    jiuzhou4 = models.SmallIntegerField(db_column='JiuZhou4')  # Field name made lowercase.

    jiuzhou5 = models.SmallIntegerField(db_column='JiuZhou5')  # Field name made lowercase.

    jiuzhou6 = models.SmallIntegerField(db_column='JiuZhou6')  # Field name made lowercase.

    jiuzhou7 = models.SmallIntegerField(db_column='JiuZhou7')  # Field name made lowercase.

    jiuzhou8 = models.SmallIntegerField(db_column='JiuZhou8')  # Field name made lowercase.

    jiuzhou9 = models.SmallIntegerField(db_column='JiuZhou9')  # Field name made lowercase.

    errorcode = models.IntegerField(db_column='ErrorCode')  # Field name made lowercase.



    class Meta:

        managed = False

        db_table = 'znj_carstatustbl20211216135710'

