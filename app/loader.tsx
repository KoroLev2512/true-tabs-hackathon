import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.container}>
        <div className={styles.carousel}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={styles.love}></div>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.carousel}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={styles.death}></div>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.carousel}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={styles.robots}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
