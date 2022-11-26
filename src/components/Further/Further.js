import "./Further.css";

function Further(props) {
    return (
        <section className="further">
            <button className="further__button" onClick={props.onClick}>
                <p className="further__link">Ещё</p>
            </button>
        </section>
    );
}

export default Further;