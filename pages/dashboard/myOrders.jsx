import styles from "../../styles/pageStyles/MyOrders.module.css";
import PendingOrder from "../../components/PendingOrder";
import CompletedOrder from "../../components/CompletedOrder";
import { useState } from "react";
import Button from "../../components/ui/Button";

const MyOrders = () => {
  const [tab, setTab] = useState("pending");

  const handleClick = e => {
    setTab(e.target.id);
  };

  return (
    <div className={styles.listed}>
      <h2 className={styles.pageTitle}>Orders You made:</h2>

      <div className={styles.filter}>
        <h2>Filter by:</h2>
        <div className={styles.buttons}>
          <Button
            color={tab !== "pending" ? "text" : "warning"}
            id="pending"
            onClick={handleClick}
          >
            Pending
          </Button>
          <Button
            color={tab !== "processing" ? "text" : "violet"}
            id="processing"
            onClick={handleClick}
          >
            Processing
          </Button>
          <Button
            color={tab !== "completed" ? "text" : "success"}
            id="completed"
            onClick={handleClick}
          >
            Completed
          </Button>
        </div>
      </div>

      {tab === "pending" && (
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <h2>
              <span
                className={styles.colorIcon}
                data-name="pendingOrders"
              ></span>
              Pending Orders: <span>13</span>
            </h2>
          </div>
          <div className={styles.container}>
            <div className={styles.column}>
              <PendingOrder />
              <PendingOrder />
              <PendingOrder />
              <PendingOrder />
              <PendingOrder />
              <PendingOrder />
            </div>
          </div>
        </div>
      )}

      {tab === "processing" && (
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <h2>
              <span
                className={styles.colorIcon}
                data-name="processingOrders"
              ></span>
              Processing Orders: <span>13</span>
            </h2>
          </div>
          <div className={styles.container}>
            <div className={styles.column}>
              <PendingOrder />
            </div>
          </div>
        </div>
      )}

      {tab === "completed" && (
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <h2>
              <span
                className={styles.colorIcon}
                data-name="completedOrders"
              ></span>
              Completed Orders: <span>13</span>
            </h2>
          </div>
          <div className={styles.container}>
            <div className={styles.column}>
              <CompletedOrder />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
