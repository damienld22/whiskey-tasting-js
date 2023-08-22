import styles from "./TastingList.module.css";

const TastingList = ({ tastings }) => {
  return (
    <div>
      {tastings.map((tasting) => (
        <div className={styles.item} key={tasting._id}>
          <p>{tasting.drinkName}</p>
          <p>{tasting.score}/5</p>
        </div>
      ))}
    </div>
  );
};

export default TastingList;
