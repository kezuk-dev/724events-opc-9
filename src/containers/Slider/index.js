import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  if (!data || !data.focus || data.focus.length === 0) {
    return <div>Chargement...</div>;
  }
  const byDateDesc = data.focus.sort((evtA, evtB) => 
    new Date(evtB.date) - new Date(evtA.date)
  );
  const nextCard = () => {
    setIndex((prevIndex) => 
      prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
    );
  };
  useEffect(() => {
    const interval = setInterval(nextCard, 5000);
    return () => clearInterval(interval);
  }, [byDateDesc]);
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.id}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
  
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event) => (
            <input
              key={event.id}
              type="radio"
              name="radio-button"
              checked={index === byDateDesc.indexOf(event)}
              onChange={() => setIndex(byDateDesc.indexOf(event))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
