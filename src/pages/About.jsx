import { useEffect, useRef, useState } from "react";
import countryFacts from "../API/countryData.json";

export const About = () => {
    const [visibleCount, setVisibleCount] = useState(9);
    const loaderRef = useRef(null);

    const loadMore = () => {
      setVisibleCount((prev) => prev+9);
    }

    //lazyLoading

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          // console.log(entries[0])
          if(entries[0].isIntersecting) {
            loadMore();
          }
        },
        {
          threshold: 1.0,
        }
      );

      if(loaderRef.current) {
        // console.log(loaderRef.current);
        
        observer.observe(loaderRef.current);
      }

      return () => {
        if(loaderRef.current) observer.unobserve(loaderRef.current)
      }
    },[])

    return (
        <section className="section-about container">
      <h2 className="container-title">
        Here are the Interesting Facts
        <br />
        we’re proud of
      </h2>

      <div className="gradient-cards">
        {countryFacts.slice(0,visibleCount).map((country) => {
          const { id, countryName, capital, population, interestingFact } =
            country;
          return (
            <div className="card" key={id}>
              <div className="container-card bg-blue-box">
                <p className="card-title">{countryName}</p>
                <p>
                  <span className="card-description">Capital:</span>
                  {capital}
                </p>
                <p>
                  <span className="card-description">Population:</span>
                  {population}
                </p>
                <p>
                  <span className="card-description">Interesting Fact:</span>
                  {interestingFact}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invisible loader for IntersectionObserver */}
      <div ref={loaderRef} style={{ height: "10px", margin: "30px 0" }} />
    </section>
    )
}