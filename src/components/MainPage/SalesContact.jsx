import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { PopupModal } from "react-calendly"; // Import PopupModal component

const Container = tw.div`
  pt-32 md:pb-24
`;

const GridContainer = tw.div`
  Container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative
`;

const LeftSection = tw.div`
  space-y-8 md:pt-10
`;

const Header = tw.div``;

const Title = tw.h1`
  md:text-5xl text-xl font-medium mb-4
`;

const Description = tw.p`
  text-md text-gray-700
`;

const Reviews = tw.div`
  space-y-4 md:pt-20
`;

const Review = tw.div`
  flex items-center space-x-2
`;

const Stars = tw.span`
  text-yellow-500
`;

const ReviewText = tw.p`
  italic
`;

const ReviewAuthor = tw.span`
  font-bold
`;

const RightSection = tw.div`
  bg-white p-8 rounded-tl-[40px] rounded-br-[40px] shadow-5xl space-y-6 border border-orange-200 transform 
`;

const SupportLink = tw(Link)`
  text-sm 
`;

const InputGrid = tw.div`
  grid grid-cols-1 md:grid-cols-2 gap-4
`;

const Input = tw(Field)`
  border p-2 rounded w-full
`;

const SubmitButton = tw.button`
  w-full py-2 bg-orange-500 text-white rounded 
`;

const PrivacyText = tw.p`
  text-xs text-gray-600
`;

const PrivacyLink = tw(Link)`
  underline
`;

const SalesContact = () => {
  const [phone, setPhone] = useState("");
  const [showCalendly, setShowCalendly] = useState(false); // State to control Calendly popup
  const [formValues, setFormValues] = useState({}); // State to hold form values

  const handleFormSubmit = (values) => {
    console.log(values);

    // Save form values and show Calendly popup after form submission
    setFormValues(values);
    setShowCalendly(true); // Open the Calendly modal immediately
  };

  return (
    <Container>
      <GridContainer>
        {/* Left Section */}
        <LeftSection>
          <Header>
            <Title>
              Get in touch with
              <br /> our Sales team
            </Title>
            <Description>
              Let one of our consultants walk you through the Adsevo platform and
              help you define the best plan for your needs.
            </Description>
          </Header>
          <Reviews>
            <Review>
              <Stars>★★★★★</Stars>
              <ReviewText>
                "Adsevo is the ideal platform to execute marketing”
                <br />
                <ReviewAuthor>- Parvej</ReviewAuthor>
              </ReviewText>
            </Review>
            <Review>
              <Stars>★★★★★</Stars>
              <ReviewText>
                “Excellent marketing tool at the best price”
                <br />
                <ReviewAuthor>- Anuj</ReviewAuthor>
              </ReviewText>
            </Review>
          </Reviews>
        </LeftSection>
        {/* Right Section */}
        <RightSection>
          <div className="text-right">
            <SupportLink to="/login">
              Already a customer?{" "}
              <span className="text-orange-500">Get account support here</span>
            </SupportLink>
          </div>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              company: "",
              phoneNumber: "",
            }}
            onSubmit={handleFormSubmit}
          >
            {({ values }) => (
              <Form className="space-y-4">
                <InputGrid>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name*"
                  />
                  <Input type="text" name="lastName" placeholder="Last Name*" />
                </InputGrid>
                <Input type="email" name="email" placeholder="Work Email*" />
                <Input type="text" name="company" placeholder="Company*" />

                <PhoneInput
                  style={{
                    width: "100%",
                    "--react-international-phone-height": "43px",
                    "--react-international-phone-font-size": "15px",
                  }}
                  defaultCountry="gh"
                  name="phoneNumber"
                  placeholder="Enter your phone number*"
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                />

                <SubmitButton type="submit">Get in touch</SubmitButton>
              </Form>
            )}
          </Formik>

          <PrivacyText>
            Sevo Adsevo will only use your personal information to
            provide the product or service you requested and contact you with
            related content that may interest you. You may unsubscribe from
            these communications at any time. For more information on
            unsubscribing and how we protect and respect your privacy, check out
            our <PrivacyLink to="#">Privacy Policy</PrivacyLink>.
          </PrivacyText>

          {/* Calendly Popup Widget */}
          <PopupModal
            url="https://calendly.com/noreply-adsevo/30min" // Your real Calendly URL
            rootElement={document.getElementById("root")}
            open={showCalendly}
            onModalClose={() => setShowCalendly(false)}
            prefill={{
              name: `${formValues.firstName} ${formValues.lastName}`,
              email: formValues.email,
            }}
          />
        </RightSection>
      </GridContainer>
    </Container>
  );
};

export default SalesContact;
