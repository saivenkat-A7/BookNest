import './Contact.css';

import React, { useState } from "react";
import { useCreateContactMutation } from '../../redux/features/contact/contactApi';
import { useAuth } from '../../context/AuthContext';

const Contact = () => {
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email:  "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [createContact] = useCreateContactMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createContact(formData).unwrap();
      alert("Message sent successfully!");
      setFormData({
        fullName: "",
        email: currentUser?.email || "",
        mobile: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      
      alert("Failed to send message.");
    }
  };

  return (
    <section className="contact" id="contact">
      <h2 className="heading">
        Contact <span>Me!</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
               // Optional: disable if always using currentUser.email
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
        </div>

        <div className="input-box">
          <div>
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <p className="error">{errors.mobile}</p>}
          </div>

          <div>
            <input
              type="text"
              name="subject"
              placeholder="Email Subject"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && <p className="error">{errors.subject}</p>}
          </div>
        </div>

        <div>
          <textarea
            name="message"
            cols="30"
            rows="10"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <p className="error">{errors.message}</p>}
        </div>

        <input type="submit" value="Send Message" className="btn" />
      </form>
    </section>
  );
};

export default Contact;
