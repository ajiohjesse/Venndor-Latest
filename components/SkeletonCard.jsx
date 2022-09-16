import styles from "../styles/Skeleton.module.css";
import LoadingImage from "./ui/LoadingImage";

const SkeletonCard = () => {
  return (
    <div className={styles.skeleton}>
      <span>
        <LoadingImage />
      </span>
      <span>
        <div className={styles.skeletonText}>
          <LoadingImage />
        </div>
        <div className={styles.skeletonText}>
          <LoadingImage />
        </div>
        <div className={styles.skeletonText}>
          <LoadingImage />
        </div>
        <div className={styles.skeletonText}>
          <LoadingImage />
        </div>
      </span>
    </div>
  );
};

export default SkeletonCard;
