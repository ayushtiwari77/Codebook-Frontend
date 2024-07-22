export const Ratings = ({ ratingVal }) => {
  let ratingArray = Array(5).fill(false);
  for (let i = 0; i < ratingVal; i++) {
    ratingArray[i] = true;
  }

  return (
    <div className="flex items-center my-2">
      {ratingArray.map((rate, ind) =>
        rate ? (
          <i
            className="text-lg bi bi-star-fill text-yellow-500 mr-1"
            key={ind}
          ></i>
        ) : (
          <i key={ind} className="text-lg bi bi-star text-yellow-500 mr-1"></i>
        )
      )}
    </div>
  );
};
