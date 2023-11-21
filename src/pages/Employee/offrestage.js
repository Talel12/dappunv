import React from 'react'
import "./offre.css"
const offrestage = () => {
  return (
    <div>
<div class="row">
    <div class="col-sm-6">
      <div class="caard">
        <div class="card-body">
            <div className='card-image'> <img src='https://infosconcourseducation.com/wp-content/uploads/2023/05/recrutement-1-2.jpg' width={300}>
                </img></div>
          <h5 class="card-title">Offre Emploi</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.
          With supporting text below as a natural lead-in to additional content.
          With supporting text below as a natural lead-in to additional content.</p>
          <h4 style={{color:"teal"}}>Le 24/03/2023</h4>
          <a href="#" class="bottt">Ajouter un offre</a>
        </div>
      </div>
    </div>


    <div class="col-sm-6">
      <div class="caard">
        <div class="card-body">
        <div className='card-image'> <img src='https://i0.wp.com/www.possibility.fr/wp-content/uploads/2018/07/stage.jpg' width={300}></img></div>
          <h5 class="card-title">Offre Stage</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.
          With supporting text below as a natural lead-in to additional content.
          With supporting text below as a natural lead-in to additional content.
     </p>
          <h4 style={{color:"teal"}}>Le 24/03/2023</h4>
          <a href="#" class="botttt">Ajouter un stage</a>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default offrestage