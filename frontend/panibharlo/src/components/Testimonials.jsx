import React from "react";

export default function Testimonials() {
  return (
    <section className="testimonial-section">
      <div className="auto-container">
        <div className="inner-box">
          <figure className="author-thumb">
            <img src="assets/images/resource/testimonial-2.jpg" alt="Client" />
          </figure>
          <div className="inner">
            <ul className="rating clearfix">
              {[...Array(5)].map((_, i) => (
                <li key={i}><i className="fas fa-star"></i></li>
              ))}
            </ul>
            <p>
              Lorem ipsum dolor amet consectur adicing elit sed do usmod tempor
              incididunt enim ad minim veniam.
            </p>
            <h5>Michael Bean</h5>
            <span className="designation">Founder CEO</span>
          </div>
        </div>
      </div>
    </section>
  );
}
