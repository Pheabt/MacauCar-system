from __future__ import unicode_literals
from showcar import models
from django.shortcuts import render
from django.template import Context
from django.http import HttpResponse
 
def hello(request):
    return HttpResponse("Hello world ! ")

def publish(request):
    #car_list = models.ZnjCarcrossinfotbl20211216124301.objects.all()
    car_newest = models.ZnjCarstatustbl20211216135710.objects.raw('select * from znj_carstatustbl20211216135710 order by HMSMS desc limit 1')
    return render(request,"car.html",{"car_obj_newest":car_newest})
    #select * from znj_carcrossinfotbl20211216135710 order by HMSMS desc limit 1

def hlcar(request):
    car_static = models.ZnjCarstatustbl20211216135710.objects.raw('select * from znj_carstatustbl20211216135710 order by HMSMS desc limit 1')
    return render(request,"hlcar.html",{"car_obj_static":car_static})


def newcar(request):
    car_list = models.ZnjCarcrossinfotbl20211216124301.objects.all()
    return render(request,"newcar.html",{"car_obj_list":car_list})

def test(request):
    car_list = models.ZnjCarcrossinfotbl20211216124301.objects.all()
    return render(request,"haiLiangPage.html",{"car_obj_list":car_list})


def shownum(request):
    num = models.ZnjCarstatustbl20211216135710.objects.all().values('energy')

def publishshow(request): 
    car_list = models.ZnjCarcrossinfotbl20211216124301.objects.all()
    return render(request,"index.html",{"car_obj_list":car_list})

    
def haicar(request):
    #car_list = models.ZnjCarcrossinfotbl20211216124301.objects.all()
    car_newest = models.ZnjCarstatustbl20211216135710.objects.raw('select * from znj_carstatustbl20211216135710 order by HMSMS desc limit 1')
    return render(request,"haicar.html",{"car_obj_newest":car_newest})

def combinecar(request):
    car_static = models.ZnjCarstatustbl20211216135710.objects.raw('select * from znj_carstatustbl20211216135710 order by HMSMS desc limit 1')
    return render(request,"combine.html",{"car_obj_static":car_static})