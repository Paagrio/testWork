import React from 'react';
import api from './api';
import './styles.css';
import { Link } from 'react-router-dom';
// Компонент каталога. Отображает карточки с турами
class Catalog extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            loading: true
        }
        this.page = 0;
    }

    getCatalogByPage = (page) => {
        this.setState({ loading: true });
        api.get("cat/" + page)
            .then((res) => {
                this.setState((state) => {
                    return {
                        items: [...state.items, ...res.data],
                        loading: false
                    }
                })
            });
    }

    scroll = () => {
        let d = document.documentElement;
        let offset = d.scrollTop + window.innerHeight;
        let height = d.offsetHeight;
        if (offset === height) {
            this.getCatalogByPage(this.page + 1)
            this.page++;
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.scroll)
        this.getCatalogByPage(this.page);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.scroll)
    }

    render() {
        const items = this.state.items;
        const loading = this.state.loading;
        return (
            <div className="centered column">
                {items.map(obj => {
                    return <CatalogItem key={obj.id} data={obj} />
                })}
                {loading ? <h1>loading...</h1> : null}
            </div>
        );
    }
}

function formatDate(date) {
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth();
    return ('0' + day).slice(-2) + "." + ('0' + month).slice(-2);
}

//Функциональный компонент карточки тура.
function CatalogItem(props) {
    const id = props.data.id;
    const title = props.data.title;
    const header = props.data.header;
    const image = props.data.photo;
    const minPrice = props.data.minPrice;
    const period = formatDate(props.data.periodStart) + " - " + formatDate(props.data.periodEnd);
    return (
        <div className="catalogItem">
            <Link to={"/" + id} className="catalogSearch">
                <div className="catalogImage">
                    <div className="image" style={{ backgroundImage: "url(" + image + ")" }}></div>
                    <div className="catalogTitle">
                        <span>
                            {title}
                        </span>
                    </div>
                </div>
                {props.data.periodStart === null || props.data.periodEnd === null ? null : (
                    <div className="catalogPeriod">
                        <span>{period}</span>
                    </div>
                )}
                <div className="catalogContent">
                    <p>
                        {header}
                    </p>
                </div>
                {minPrice === null || minPrice <= 0 ? null : (
                    <div className="catalogPrice">
                        Цена от: <span>{Number.isInteger(minPrice) ? minPrice : minPrice.toFixed(2)} ₽</span>
                    </div>
                )}
            </Link>
        </div>
    );
}

export default Catalog;