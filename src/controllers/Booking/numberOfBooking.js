import { Booking } from "../../models/BookingModel.js";

export const getBookingsCountInMonth = async (req, res) => {
  const { year, month } = req.query;

  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const monthsArray = Array.from({ length: 12 }, (_, index) => {
      const currentMonth = new Date(year, index, 1);
      return {
        _id: currentMonth,
        count: 0,
      };
    });

    // Perform an aggregation to count bookings within the specified month range
    const bookingsCount = await Booking.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: "$date",
          count: { $sum: 1 },
        },
      },
    ]);
    const months = [
         'Jan',  'Feb',  'Mar',  'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep',  'Oct',  'Nov',  'Dec'
    ];

    // Merge the results with the monthsArray to fill in missing months with count: 0
    const mergedResults = monthsArray.map((monthData,index) => {
        console.log(month);
      const matchingBooking = bookingsCount.find((booking) =>
        booking._id.getMonth() === monthData._id.getMonth()
      );

 
      return {
        _id: monthData._id,
        month:months[index],
        count: matchingBooking ? matchingBooking.count : 0,
      };
    });

    res.status(200).json({
      message: `Number of bookings made in ${year}-${month}: ${mergedResults.reduce(
        (total, monthData) => total + monthData.count,
        0
      )}`,
      bookings: mergedResults,
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
