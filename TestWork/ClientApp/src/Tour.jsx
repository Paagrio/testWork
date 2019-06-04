import React from "react";
import api from "./api";
import { Link } from "react-router-dom";
import Slider from "react-slick";

//компонент для отображения детальной информации по туру

class Tour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true
    }
  }

  componentDidMount() {
    let { tourId } = this.props.match.params;
    api.get("tour/" + tourId)
      .then(res => {
        this.setState({ data: res.data, loading: false });
      });
  }

  renderSlider = (photos) => {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        {photos.map((obj, index) =>
          <div key={index} style={{ height: "500px", width: "500px" }}>
            <img src={obj} alt="" />
          </div>)}
      </Slider>
    )
  }

  render() {
    const loading = this.state.loading;
    const data = this.state.data;
    if (loading || !data) {
      return <h1>loading...</h1>
    }
    return (
      <div className="centered column tourDetail">
        <Link to="/" className="back">
          <span>Туры</span>
        </Link>
        <div className="tourTitle">
          <span>{data.title}</span>
        </div>
        <div className="tourDescription">
          <span>{data.description}</span>
        </div>
        <h3>Маршрут:</h3>
        <ul>
          {data.route.map((obj, index) => {
            return <li key={index}><span>{obj}</span></li>
          })}
        </ul>
        {data.photoAlbum === null ? null : (
          <div style={{ width: "500px", display: "block", margin: "50px 0" }}>
            {this.renderSlider(data.photoAlbum.map(obj => obj.thumbnail))}
          </div>
        )}
      </div >
    )
  }
}

export default Tour;