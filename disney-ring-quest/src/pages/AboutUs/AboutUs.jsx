import "./AboutUs.css"

function AboutUs() {
    return <div className="about-us-page">
        <div className="container-about">
            <div className="box-sides">
                <div className="person">
                    <div className="person-image" id="jose-image"></div>
                    <div className="title">
                        Jose
                    </div>
                    <div className="person-info">
                        Me he leído la saga de Harry Potter 3 veces, pero no he visto todas las películas
                    </div>
                </div>
                <div className="person">
                    <div className="person-image" id="trini-image"></div>
                    <div className="title">
                        Trini
                    </div>
                    <div className="person-info">
                        Soy buena para ver series y terminarlas en un día
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AboutUs;