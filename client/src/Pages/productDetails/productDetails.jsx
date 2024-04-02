import React, {useState} from 'react'

function productDetails() {
    const [showDescription, setShowDescription] = useState(true);

    const toggleContent = () => {
        setShowDescription(!showDescription);
    };

  return (
    <div>
      <div>
        <h1></h1>
      </div>
      <div></div>
      <div className="mx-6 -mt-32 mb-24">
                <div className="flex">
                    <div className="flex">
                        <button
                            onClick={() => setShowDescription(true)}
                            className={`border-t-2 border-transparent py-2 px-4 -ml-2 ${showDescription ? 'text-custom-brown' : 'text-casse'} font-bold`}
                        >
                            Description
                        </button>
                    </div>
                    <div className="flex">
                        <button
                            onClick={() => setShowDescription(false)}
                            className={`border-t-2 border-transparent py-2 px-4 ${showDescription ? 'text-casse' : 'text-custom-brown'} font-bold`}
                        >
                            Feedback
                        </button>
                    </div>
                </div>
                <div className="border-b-4 border-casse my-2"></div>
                {showDescription ? (
                    <div>
                        <h2 className="text-lg font-bold mb-2">Description Content</h2>
                        <p>This is the default content displayed when the page loads.</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-lg font-bold mb-2">Feedback Content</h2>
                        <p>This content will be displayed when the Feedback button is clicked.</p>
                    </div>
                )}
            </div>
      <div></div>
    </div>
  )
}

export default productDetails
