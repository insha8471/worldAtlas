import { useEffect, useReducer, useRef, useState, useTransition } from "react";
import { getCountryData } from "../API/postApi";
import { Loader } from "../components/UI/Loader";
import { CountryCard } from "../components/Layout/CountryCard";
import { SearchFilter } from "../components/UI/SearchFilter";

export const Country = () => {
    // for api fetching...
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);
  
  // search functionality...
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  //for infinite loading
  const [visibleCount, setVisibleCount] = useState(10);
  const loadRef = useRef(null);



  const loadMore = () => {
    setVisibleCount(prev => prev+10);
  }

  //infinite loading
  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            if(entries[0].isIntersecting) {
                loadMore();
            }
        },
        {
            threshold: 1.0,
        }
    );

    if(loadRef.current) {
        observer.observe(loadRef.current);
    }

    return () => {
        if(loadRef.current) observer.unobserve(loadRef.current);
    }
  })

  useEffect(() => {

    startTransition(async () => {
      const res = await getCountryData();
      setCountries(res.data);
    });
  }, []);

  // search logic
  const searchCountry = (country) => {
      if(search) {
        return country.name.common.toLowerCase().includes(search.toLowerCase());
      }

      return country;
  }

  const filterRegion = (country) => {
    if(filter === 'All') return country;

    return country.region === filter;
  }

  const filterCountries = countries.filter(
    (country) => searchCountry(country) && filterRegion(country)
  );

  

  if (isPending) return <Loader />;


  return (
    <section className="country-section">
        < SearchFilter
            search = {search}
            setSearch = {setSearch}
            filter = {filter}
            setFilter = {setFilter}
            countries = {countries}
            setCountries = {setCountries}
        />
      <ul className="grid grid-four-cols">
        {filterCountries.slice(0,visibleCount).map((curCountry, index) => { 
          return <CountryCard country={curCountry} key={index} />;
        })}
      </ul>

      {/* Invisible loader for IntersectionObserver */}
      <div ref={loadRef} style={{ height: "10px", margin: "30px 0" }} />
    </section>
  );
};