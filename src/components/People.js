import React,{useState} from 'react'

function People({item,index}) {
    const { name, birth_year, height } = item
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
             <button className="card_title_container"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                // aria-controls={`sec${+index + 1}`}
                // id={`card${+index + 1}p`}
                data-allow-toggle
            >
           {name}
          
           </button>
           {isOpen && <div className="card_content"
                // id={`sec${+index + 1}`}
                // aria-labelledby={`card${+index + 1}p`}
                // role="region"
                >

                <p tabIndex="0" >Name: {name}</p>
                <p tabIndex="0">Year born : {birth_year}</p>
                <p tabIndex="0" >Height: {height}</p>

            </div>}
          
        </div>
    )
}

export default People