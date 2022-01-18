var express = require('express');
var router = express.Router();

const rooms = [
    {
        roomID: 0,
        roomName: "300",
        noOfSeatsAvailable: "2",
        amenities: ["Hot shower", "WIFI", "Intercom", "Room service"],
        pricePerHr: 100,
        bookedStatus: false,
        customerDetails: {
            customerName: "",
            date: "",
            startTime: "",
            endTime: "",
        },
    },
    {
        roomID: 1,
        roomName: "301",
        noOfSeatsAvailable: "2",
        amenities: ["Hot shower", "WIFI", "Intercom", "Room service"],
        pricePerHr: 100,
        bookedStatus: true,
        customerDetails: {
            customerName: "Rajesh",
            date: "16/10/2021",
            startTime: 1100,
            endTime: 1800,
        },
    },
    {
        roomID: 2,
        roomName: "302",
        noOfSeatsAvailable: "2",
        amenities: ["Hot shower", "WIFI", "Intercom", "Room service"],
        pricePerHr: 100,
        bookedStatus: false,
        customerDetails: {
            customerName: "Mallesh",
            date: "18/10/2021",
            startTime: 1000,
            endTime: 1800,
        },
    },
    {
        roomID: 3,
        roomName: "303",
        noOfSeatsAvailable: "2",
        amenities: ["Hot shower", "WIFI", "Intercom", "Room service"],
        pricePerHr: 100,
        bookedStatus: false,
        customerDetails: {
            customerName: "",
            date: "",
            startTime: "",
            endTime: "",
        },
    },
    {
        roomID: 4,
        roomName: "304",
        noOfSeatsAvailable: "2",
        amenities: ["Hot shower", "WIFI", "Intercom", "Room service"],
        pricePerHr: 100,
        bookedStatus: false,
        customerDetails: {
            customerName: "Priya",
            date: "16/11/2021",
            startTime: 1200,
            endTime: 2000,
        },
    },
];

/* home Page */
router.get('/', function (req, res, next) {
    res.send('Hall Booking API');
});

/* Available rooms */
router.get('/rooms', function (req, res) {
    res.send(
        rooms.filter(room => room.bookedStatus !== true).map(room => {
            return {
                RoomName: room.roomName,
                'Seats Available': room.noOfSeatsAvailable,
                'Price/hr': room.pricePerHr,
            }
        })
    );
});

/* create room with incomming request */
router.post('/rooms/create', function (req, res) {
    const newRoom = req.body;
    rooms.push(newRoom);
    res.send(newRoom);
});

/* book room based on availablity */
router.post('/rooms/book', function (req, res) {
    const bookingRoom = req.body;

    rooms.filter(room => room.roomID === bookingRoom.roomID).map(room => {
        if (room.customerDetails.date !== bookingRoom.date) {
            room.customerDetails.customerName = bookingRoom.customerName;
            room.customerDetails.date = bookingRoom.date;
            room.customerDetails.startTime = bookingRoom.startTime;
            room.customerDetails.endTime = bookingRoom.endTime;
            room.bookedStatus = !room.bookedStatus;
            res.send("Room booked successfully")
        }
        else {
            res.send("The Room is not available in the mentioned time/date. Please try on other time/date")
        }
    })

});

/*Booked Room Details */
router.get('/roomsdetail', function (req, res) {
    res.send(
        rooms.filter(room => room.bookedStatus === true).map(room => {
            return {
                roomName: room.roomName,
                customerName: room.customerDetails.customerName,
                bookedStatus: room.bookedStatus,
                date: room.customerDetails.date,
                startTime: room.customerDetails.startTime,
                endTime: room.customerDetails.endTime,
            }
        })
    );
});

/*Booked Customer Details */
router.get('/customersdetail', function (req, res) {
    res.send(
        rooms.filter(room => room.bookedStatus === true).map(room => {
            return {
                customerName: room.customerDetails.customerName,
                roomName: room.roomName,
                date: room.customerDetails.date,
                startTime: room.customerDetails.startTime,
                endTime: room.customerDetails.endTime,
            }
        })
    );
});

module.exports = router;
