

import Images from 'Images';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import tw from 'tailwind-styled-components';

// Styled Components using tw
const Container = tw.div`pt-28 pb-4`;
const FormContainer = tw.div`Container relative`;
const FlexContainer = tw.div`flex flex-col lg:flex-row items-center justify-center min-h-screen p-4`;
const ImageContainer = tw.div`hidden lg:block w-full lg:w-7/12 px-4 py-4 self-start`;
const InfoContainer = tw.div`mt-8 grid md:grid-cols-3 gap-4 text-center`;
const InfoBlock = tw.div``;
const InfoTitle = tw.h3`font-semibold`;
const InfoText = tw.p`text-xs text-gray-600`;
const FormSection = tw.div`w-full lg:w-5/12 py-4 pl-4 pr-4 md:pl-16 md:pr-4 self-start`;
const FormTitle = tw.h2`text-2xl font-bold mb-4`;
const FormDescription = tw.p`mb-6`;
const FormGroup = tw.div`grid md:grid-cols-2 grid-cols-1 gap-4 mb-4`;
const FormField = tw.div``;
const Label = tw.label`block text-gray-700 text-sm font-bold mb-2`;
const Input = tw.input`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
const Textarea = tw.textarea`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
const SubmitButton = tw.button`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`;

const ContactForm = () => {
    // Formik setup
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            message: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            mobile: Yup.string().required('Mobile number is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            message: Yup.string().required('Message is required'),
        }),
        onSubmit: (values) => {
            // Handle form submission
            console.log(values);
        },
    });

    return (
        <Container>
            <FormContainer>
                <FlexContainer>
                    <ImageContainer>
                        <img
                            src={Images.Contact}
                            alt="Office"
                            className="rounded-lg shadow-lg"
                        />
                        <InfoContainer>
                            <InfoBlock>
                                <InfoTitle>New York</InfoTitle>
                                <InfoText>123 5th Ave</InfoText>
                                <InfoText>New York, NY 10001</InfoText>
                            </InfoBlock>
                            <InfoBlock>
                                <InfoTitle>California</InfoTitle>
                                <InfoText>456 Market St</InfoText>
                                <InfoText>San Francisco, CA 94103</InfoText>
                            </InfoBlock>
                            <InfoBlock>
                                <InfoTitle>Chicago</InfoTitle>
                                <InfoText>789 Michigan Ave</InfoText>
                                <InfoText>Chicago, IL 60611</InfoText>
                            </InfoBlock>
                        </InfoContainer>
                    </ImageContainer>
                    <FormSection>
                        <FormTitle>Get in touch</FormTitle>
                        <FormDescription>Have an inquiry or some feedback for us? Fill out the form below to contact our team.</FormDescription>
                        <form onSubmit={formik.handleSubmit}>
                            <FormGroup>
                                <FormField>
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="Jane"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.firstName}
                                    />
                                    {formik.touched.firstName && formik.errors.firstName ? (
                                        <div className="text-red-500 text-xs">{formik.errors.firstName}</div>
                                    ) : null}
                                </FormField>
                                <FormField>
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Smith"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.lastName}
                                    />
                                    {formik.touched.lastName && formik.errors.lastName ? (
                                        <div className="text-red-500 text-xs">{formik.errors.lastName}</div>
                                    ) : null}
                                </FormField>
                            </FormGroup>
                            <FormField className="mb-4">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="janesmith@example.com"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-500 text-xs">{formik.errors.email}</div>
                                ) : null}
                            </FormField>
                            <FormField className="mb-4">
                                <Label htmlFor="mobile">Mobile Number</Label>
                                <Input
                                    id="mobile"
                                    name="mobile"
                                    type="number"
                                    placeholder="12345678"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.mobile}
                                />
                                {formik.touched.email && formik.errors.mobile ? (
                                    <div className="text-red-500 text-xs">{formik.errors.mobile}</div>
                                ) : null}
                            </FormField>
                            <FormField className="mb-4">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Hey friends, I'd love to talk to you about this Drone AI project we're working on..."
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.message}
                                    rows="4"
                                ></Textarea>
                                {formik.touched.message && formik.errors.message ? (
                                    <div className="text-red-500 text-xs">{formik.errors.message}</div>
                                ) : null}
                            </FormField>
                            <SubmitButton type="submit">Get in touch</SubmitButton>
                        </form>
                    </FormSection>
                </FlexContainer>
            </FormContainer>
        </Container>
    );
}

export default ContactForm;

