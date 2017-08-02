'use strict';

import welcome from './welcome';

welcome("home");

exports.welcome = welcome; //для того чтоб был доступ из вне (library:"home")
