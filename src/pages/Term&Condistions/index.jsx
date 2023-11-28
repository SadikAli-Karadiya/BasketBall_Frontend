import react from "react";
import Heading from '../../Component/Heading';


const TermsandCondition = () => {
    const Termsandcondition = [
        {
            heading: "",
            subheading: "",
            description: "Welcome to CBL, the ultimate destination for basketball enthusiasts to immerse themselves in the thrilling world of the game. By accessing or using our website, you are agreeing to comply with the following terms and conditions that outline the rules and expectations for your interaction with our platform."
        },
        {
            heading: " 1. Acceptance of Terms",
            subheading: "",
            description: "Your use of this website signifies your acceptance of these terms and conditions. If you do not agree with any part of these terms, kindly refrain from using the website."
        },
        {
            heading: "2. User Registration",
            subheading: "",
            description: "Visitors can register to access live basketball scores, while players can unlock additional features by providing accurate personal information and meeting eligibility criteria."
        },
        {
            heading: "3. User Responsibilities",
            subheading: "",
            description: "Users are responsible for maintaining the confidentiality of their account information, refraining from sharing credentials, and being accountable for all activities under their accounts."
        },
        {
            heading: "4. Prohibited Activities",
            subheading: "",
            description: "Engaging in unlawful or disruptive activities is strictly prohibited to ensure a respectful and positive environment within the community."
        },
        {
            heading: "5. Content and Intellectual Property",
            subheading: "",
            description: "Users retain ownership of their content but grant CBL a license to use, display, and distribute it on the website. All website content, including logos and trademarks, is the property of CBL."
        },
        {
            heading: "6. Privacy Policy",
            subheading: "",
            description: "The website's privacy policy governs the collection and use of user information. Users are encouraged to review the privacy policy for a comprehensive understanding of data handling practices."
        },
        {
            heading: "7. Disclaimer of Warranty",
            subheading: "",
            description: "CBL provides the website on an \"as-is\" basis, with no warranties regarding accuracy, reliability, or availability."
        },
        {
            heading: "8. Limitation of Liability",
            subheading: "",
            description: "CBL is not liable for any direct, indirect, incidental, or consequential damages arising from the use of the website."
        },
        {
            heading: "9. Termination",
            subheading: "",
            description: "CBL reserves the right to terminate user accounts or access to the website at its discretion."
        },
        {
            heading: "10. Changes to Terms and Conditions",
            subheading: "",
            description: "CBL reserves the right to update or modify these terms and conditions at any time."
        },
        {
            heading: "11. Governing Law",
            subheading: "",
            description: "These terms and conditions are governed by the laws of Ahmedabad Jurisdiction."
        },
        {
            heading: "",
            subheading: "",
            description: "By utilizing this site, you acknowledge and agree to adhere to these terms and conditions. We are dedicated to providing a vibrant and respectful community for basketball enthusiasts. If you have any questions or concerns, please reach out to us at contact.cbl@gmail.com. Thank you for being an integral part of our basketball community!"
        },
    ]
    return (
        <>
            <section className=''>
                <div className="xs:py-10 py-10">
                <h1 className="xs:text-3xl sm:text-3xl md:text-4xl text-center font-bold  italic uppercase text-[#ee6730]  ">Term & Conditions</h1>
              </div>
                <div className=" px-10 py-10 lg:py-14 lg:px-32 pb-10 ">
                    {
                        Termsandcondition.map((item, index) => {
                            return (
                                <div className="space-y-5  pb-10">
                                    <h1 className="text-2xl lg:text-3xl font-semibold text-[#ea592e]">{item.heading}</h1>
                                    <p className="text-lg lg:text-2xl xl:text-3xl">{item.subheading}</p>
                                    <p className="text-sm xl:text-base text-gray-600">{item.description}</p>
                                </div>

                            )
                        })
                    }
                </div>

            </section>
        </>
    );
};

export default TermsandCondition;
