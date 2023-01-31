import './style.css';
import getCityObject from './collect';
import eventHandler from './display'


getCityObject("Istanbul").then(result => eventHandler(result));