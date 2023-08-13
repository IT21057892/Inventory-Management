import React from "react";

import { useState, Css } from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader  ()  {
  let [loading, setLoading] = useState(true);
  let[color , setColor] = useState("#ffffff")

  const override = Css`
    display : block;
    margin : 0 auto;
    border-color : red;
    `;
    setLoading(true);
  
  return (
    <div style ={{marginTop:'150px'}}>  
    
      <div className="sweet-loading text-center">
        <HashLoader
          color='#000'
          loading={loading}
          cssOverride=' '
          size={80}
          aria-label="Loading Spinner"
          
        />
      </div>
    </div>
  );
};

export default Loader;
