
// import React from 'react';
// import { Link } from 'react-router-dom';
// import tw from 'tailwind-styled-components';
// import { IoIosCheckmark } from "react-icons/io";
// import { GoArrowRight } from "react-icons/go";

// const PricingCustomer = () => {
//     const Card = tw.div`bg-white shadow-lg rounded-xl  border border-orange-600  relative`;
//     const Price = tw.p`mt-4 text-2xl font-semibold text-gray-900 text-center mt-20`;
//     const Button = tw.button`bg-orange-600 text-white py-1.5 px-6 rounded-full mt-1.5`;
//     const FeatureLink = tw(Link)`mt-4 inline-block text-orange-500 absolute bottom-3 left-8 flex `;
//     const ListItem = tw.li`text-xs flex`;
//     const CorrectSign = tw.span`text-orange-500 `;

//     return (
//         <><div className=" py-36">
//             <div className="relative z-10 px-4 Container sm:px-6 lg:px-8">
//                 <div className="mb-20 text-center ">
//                     <h2 className="text-[42px] font-bold text-gray-800 leading-tight">Pick a plan to <span className="text-orange-500 ">grow up</span> your brand!
//                     </h2>
//                     <h2 className="text-[20px] font-normal text-gray-500 leading-tight mt-4 ">A scalable solution where you pay for what you really need.
//                     </h2>

//                 </div>
//                 {/* <Features /> */}
//                 <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">

//                     {/* Free Plan */}

//                     <Card>
//                         <div className='py-4 text-center text-white bg-orange-500 rounded-t-xl'>Your Plan</div>
//                         <h3 className="mt-6 text-lg font-semibold text-center text-orange-500">Free</h3>
//                         <p className="text-xs text-center">Discover Sevo</p>
//                         <Price>₵0/month</Price>
//                         <div className='flex justify-center'>
//                             <Button>Sign Up</Button>
//                         </div>
//                         <hr className="mt-6 border-t border-orange-500" />
//                         <div className='px-6'>
//                             <ul className="py-6 space-y-2">
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> 300 emails/day</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Customizable email templates</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Drag & drop editor</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Transactional emails</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> SMS & WhatsApp campaigns</ListItem>
//                             </ul>

//                             <FeatureLink to="/pricing-table">See all features <GoArrowRight className='ml-2 mt-1.5' /></FeatureLink>
//                         </div>
//                     </Card>

//                     {/* Starter Plan */}
//                     <Card>
//                         <h3 className="mt-6 text-lg font-semibold text-center text-orange-500">Silver</h3>
//                         <p className="text-xs text-center">Ideal for growing businesses</p>
//                         <Price>₵625/month</Price>
//                         <div className='flex justify-center'>
//                             <Button>Sign Up</Button>
//                         </div>
//                         <hr className="mt-6 border-t border-orange-500" />
//                         <div className='px-6'>
//                             <ul className="py-6 space-y-2 ">
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> From 5,000 emails/month</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> No daily sending limit</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> No Brevo logo (add-on)</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Basic reporting & analytics</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> 24/7 email support</ListItem>
//                             </ul>
//                             <FeatureLink to="/pricing-table">See all features <GoArrowRight className='ml-2 mt-1.5' /></FeatureLink>
//                         </div>
//                     </Card>

//                     {/* Business Plan */}
//                     <Card>
//                         <h3 className="mt-6 text-lg font-semibold text-center text-orange-500">Gold</h3>
//                         <p className="text-xs text-center">Built for marketing managers</p>
//                         <Price>₵1,345/month</Price>
//                         <div className='flex justify-center'>
//                             <Button>Sign Up</Button>
//                         </div>
//                         <hr className="mt-6 border-t border-orange-500" />
//                         <div className='px-6'>
//                             <ul className="py-6 space-y-2 ">
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> From 5,000 emails/month</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Marketing automation</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Predictive sending</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Multi-user access</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Landing pages</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> A/B testing</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Advanced statistics</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Phone support</ListItem>
//                             </ul>
//                             <FeatureLink to="/pricing-table">See all features <GoArrowRight className='ml-2 mt-1.5' /></FeatureLink>
//                         </div>
//                     </Card>

//                     {/* Enterprise Plan */}
//                     <Card>
//                         <h3 className="mt-6 text-lg font-semibold text-center text-orange-500">Enterprise</h3>
//                         <p className="text-xs text-center">Tailored solutions to fit your needs</p>
//                         <Price>₵1,500/month</Price>
//                         <div className='flex justify-center'>
//                             <Link to="/sales-contact">
//                                 <Button>Get a Demo</Button>
//                             </Link>
//                         </div>
//                         <hr className="mt-6 border-t border-orange-500" />
//                         <div className='px-6'>
//                             <ul className="py-6 space-y-2">
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Unlimited contacts</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Sub-account management</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Advanced integrations</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Exclusive features</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Tailored onboarding</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Personalized support</ListItem>
//                                 <ListItem><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign> Enterprise-grade security</ListItem>
//                             </ul>
//                             <FeatureLink to="/pricing-table">See all features <GoArrowRight className='ml-2 mt-1.5' /></FeatureLink>
//                         </div>
//                     </Card>
//                 </div>
//             </div>
//         </div></>
//     );
// };
// const BgImg = tw.img`absolute inset-0 w-full min-h-screen object-cover z-0`;
// export default PricingCustomer;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { IoIosCheckmark } from "react-icons/io";
import { GoArrowRight } from "react-icons/go";

const PricingCustomer = () => {
    const [selectedPlan, setSelectedPlan] = useState('Free');

    const Card = tw.div`bg-white shadow-lg rounded-xl border border-orange-600 relative`;
    const Price = tw.p`mt-4 text-2xl font-semibold text-gray-900 text-center mt-20`;
    const Button = tw.button`bg-orange-600 text-white py-1.5 px-6 rounded-full mt-1.5`;
    const FeatureLink = tw(Link)`mt-4 inline-block text-orange-500 absolute bottom-3 left-8 flex `;
    const ListItem = tw.li`text-xs flex`;
    const CorrectSign = tw.span`text-orange-500`;

    const plans = [
        {
            name: 'Free',
            title: 'Free',
            subtitle: 'Discover Adsevo',
            price: '₵0/month',
            features: [
                '300 emails/day',
                'Customizable email templates',
                'Drag & drop editor',
                'Transactional emails',
                'SMS & WhatsApp campaigns',
            ],
            buttonText: 'Sign Up'
        },
        {
            name: 'Silver',
            title: 'Starter',
            subtitle: 'Ideal for growing businesses',
            price: '₵625/month',
            features: [
                'From 5,000 emails/month',
                'No daily sending limit',
                'No Adsevo logo (add-on)',
                'Basic reporting & analytics',
                '24/7 email support',
            ],
            buttonText: 'Upgrade to Starter'
        },
        {
            name: 'Gold',
            title: 'Business',
            subtitle: 'Built for marketing managers',
            price: '₵1,345/month',
            features: [
                'From 5,000 emails/month',
                'Marketing automation',
                'Predictive sending',
                'Multi-user access',
                'Landing pages',
                'A/B testing',
                'Advanced statistics',
                'Phone support',
            ],
            buttonText: 'Upgrade to Business'
        },
        {
            name: 'Enterprise',
            title: 'Enterprise',
            subtitle: 'Tailored solutions to fit your needs',
            price: '₵1,500/month',
            features: [
                'Unlimited contacts',
                'Sub-account management',
                'Advanced integrations',
                'Exclusive features',
                'Tailored onboarding',
                'Personalized support',
                'Enterprise-grade security',
            ],
            buttonText: 'Upgrade to Enterprise'
        }
    ];

    return (
        <div className="py-36">
            <div className="relative z-10 px-4 Container sm:px-6 lg:px-8">
                <div className="mb-20 text-center">
                    <h2 className="text-[42px] font-bold text-gray-800 leading-tight">Pick a plan to <span className="text-orange-500">grow up</span> your brand!</h2>
                    <h2 className="text-[20px] font-normal text-gray-500 leading-tight mt-4">A scalable solution where you pay for what you really need.</h2>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {plans.map((plan, index) => (
                        <div key={index} className={`bg-white shadow-lg rounded-xl border border-orange-600 relative `} style={{ height: selectedPlan === plan.name ? 'auto' : '100%' }}>
                            {selectedPlan === plan.name && <div className='absolute w-full py-4 font-semibold text-center text-white bg-orange-500 rounded-t-xl -top-11'>Your Plan</div>}
                            <h3 className="mt-6 text-lg font-semibold text-center text-orange-500">{plan.title}</h3>
                            <p className="text-xs text-center">{plan.subtitle}</p>
                            <Price>{plan.price}</Price>
                            <div className='flex justify-center'>
                                <Button onClick={() => setSelectedPlan(plan.name)}>{plan.buttonText}</Button>
                            </div>
                            <hr className="mt-6 border-t border-orange-500" />
                            <div className='px-6'>
                                <ul className="py-6 space-y-2">
                                    {plan.features.map((feature, i) => (
                                        <ListItem key={i}><CorrectSign><IoIosCheckmark className='-mt-1 w-7 h-7' /></CorrectSign>{feature}</ListItem>
                                    ))}
                                </ul>
                                <FeatureLink to="/pricing-table">See all features <GoArrowRight className='ml-2 mt-1.5' /></FeatureLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingCustomer;
