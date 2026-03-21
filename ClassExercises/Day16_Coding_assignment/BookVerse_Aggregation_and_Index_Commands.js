// -------------------------------
// INDEX CREATION COMMANDS
// -------------------------------

// Create index on genre
db.Books.createIndex({ genre: 1 });

// Create index on authorId
db.Books.createIndex({ authorId: 1 });

// Create index on ratings.score (nested field)
db.Books.createIndex({ "ratings.score": 1 });

// View all indexes
db.Books.getIndexes();


// -------------------------------
// AGGREGATION QUERIES
// -------------------------------

// 1. Calculate average rating per book
db.Books.aggregate([
  { $unwind: "$ratings" },
  {
    $group: {
      _id: "$title",
      avgRating: { $avg: "$ratings.score" }
    }
  }
]);

// 2. Retrieve top 3 highest-rated books
db.Books.aggregate([
  { $unwind: "$ratings" },
  {
    $group: {
      _id: "$title",
      avgRating: { $avg: "$ratings.score" }
    }
  },
  { $sort: { avgRating: -1 } },
  { $limit: 3 }
]);

// 3. Count number of books per genre
db.Books.aggregate([
  {
    $group: {
      _id: "$genre",
      totalBooks: { $sum: 1 }
    }
  }
]);

// 4. Find authors who have more than 2 books
db.Books.aggregate([
  {
    $group: {
      _id: "$authorId",
      totalBooks: { $sum: 1 }
    }
  },
  { $match: { totalBooks: { $gt: 2 } } }
]);

// 5. Total reward points (sum of all ratings) per author
db.Books.aggregate([
  { $unwind: "$ratings" },
  {
    $group: {
      _id: "$authorId",
      totalPoints: { $sum: "$ratings.score" }
    }
  }
]);
