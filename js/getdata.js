/*

Code to get data from the race capture, ready for display.

 */

function getRaceData() {

    // Data array, contains:
    // THROTTLE, BRAKE, SPEED, REVS, GMETER, GEAR

    // var raceDataArray = [20,1,60,6000,1,4];
    var raceDataArray = demoData();
    return raceDataArray;
}

function demoData() {
    // Return some fake moving data while we test.

    var demoThrottle = parseInt(document.getElementById('demodata').elements["throttle"].value);
    var demoBrake = parseInt(document.getElementById('demodata').elements["brake"].value);
    demoThrottle = demoThrottle + 2;

    if (demoThrottle < 0) {
        demoBrake = 1;
    } else {
        demoBrake = 0;
    }

    if (demoThrottle <= 100) {
        document.getElementById('demodata').elements["throttle"].value = demoThrottle;
    } else {
        demoThrottle = 0;
        document.getElementById('demodata').elements["throttle"].value = -10;
    }

    var demoSpeed = parseInt(document.getElementById('demodata').elements["speed"].value);
    demoSpeed = demoSpeed + 1;
    if (demoSpeed <= 120) {
        document.getElementById('demodata').elements["speed"].value = demoSpeed;
    } else {
        demoSpeed = 0;
        document.getElementById('demodata').elements["speed"].value = 0;
    }

    var demoRevs = parseInt(document.getElementById('demodata').elements["revs"].value);
    demoRevs = demoRevs + 100;
    if (demoRevs <= 8000) {
        document.getElementById('demodata').elements["revs"].value = demoRevs;
    } else {
        demoRevs = 0;
        document.getElementById('demodata').elements["revs"].value = 0;
    }

    var raceDataArray = [demoThrottle,demoBrake,demoSpeed,demoRevs,1,4];

    return raceDataArray;
}