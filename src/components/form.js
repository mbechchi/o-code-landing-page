import React, { useState } from "react"
import Img from "gatsby-image"

import AnimatedButton from "../components/button"
import { FadeInUp } from "../components/animations/fadeInUp"
import { ScaleUp } from "../components/animations/scaleUp"

import AWS from 'aws-sdk';

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:c3d43947-50a2-4766-b73b-c2a1840be231',
});

const Form = ({ content, picture }) => {

  const defaultState = {
      formData: {
        name: '',
        company: '',
        email: '',
        tel: '',
        message: '',
      },
      formError: {
          email: false
      },
      formEvent: {
        sending: false,
        sent: false
      }
  };

  // for dev
//   const fillDevForm = (event) => {
//     event.preventDefault();
//     setState({
//         formData: {
//             name: 'Nietzsche',
//             company: 'Watchmen',
//             email: 'nietzsche@watchmen.com',
//             tel: '09898767',
//             message: 'Celui qui combat des monstres doit prendre garde à ne pas devenir monstre lui-même. Et si tu regardes longtemps un abîme, l’abîme regarde aussi en toi.',
//         },
//         formError: {
//             ...state.formError
//         },
//         formEvent: {
//             ...state.formEvent
//         }
//     });
//   }

  const [state, setState] = useState(defaultState)

  const handleInputChange = (event) => {
    const {value, name} = event.target;

    setState({
        formData: {
            ...state.formData,
            [name]: value
        },
        formError: {
            ...state.formError
        },
        formEvent: {
            ...state.formEvent
        }
    });

  }

  const formValidation = () => {
    let inputValidation = Object.keys(state.formData).map((itemName) => {
        switch (itemName) {

            case 'email':
                const emailError = (state.formData.email.match(/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null);
                if (emailError) {
                    setState({
                        formData: {
                            ...state.formData,
                        },
                        formError: {
                            email: emailError
                        },
                        formEvent: {
                            ...state.formEvent
                        }
                    });
                }
                return !emailError

              // other form validation ?

            default:
                return true
        }
    })
    return inputValidation.reduce((acc, next) => acc && next)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formReady = formValidation();

    if (formReady) {

        setState({
            formData: {
                ...state.formData,
            },
            formError: {
                ...state.formError
            },
            formEvent: {
                ...state.formEvent,
                sending: true
            }
        });

        const sns = new AWS.SNS();
        const params = {
            Message: JSON.stringify(state.formData),
            Subject: 'Contact from ' + state.formData.name + ' (' + state.formData.email + ')',
            TopicArn: 'arn:aws:sns:us-east-1:804391959181:Website_Contact_Form'
        };

        sns.publish(params, (err, response) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                console.log(response);

            setState({
                formData: {
                    ...state.formData,
                },
                formError: {
                    ...state.formError
                },
                formEvent: {
                    sending: false,
                    sent: true
                }
            });

            setTimeout(() => {
                setState(defaultState);
            }, 3000);
            }
        });
    }

  }

  return (
    <>
        <div className="u-flex u-flex-dir-col u-flex-dir-row@main u-flex-center-vt u-pd-hz-m@main u-mg-bottom-l">
            <ScaleUp yOffset={50} delay={300}>
                <Img className="c-rounded-illustration" fixed={picture.childImageSharp.fixed} />
            </ScaleUp>
            <FadeInUp yOffset={50} delay={300} className="u-pd-left-l">
                <h2 className="c-h3 u-center u-left@main">{content.title}</h2>
            </FadeInUp>
        </div>

        <FadeInUp yOffset={50} delay={450} className="u-pd-hz-m@main">
            <form action="" className="u-pd-hz-xl@main">

                <div className="c-form-group u-mg-bottom-m">
                    <label className="c-label u-mg-bottom-xs" htmlFor="name">{content.name}</label>
                    <input className="c-input" value={state.formData.name} onChange={handleInputChange} id="name" name="name" type="text" required="" />
                </div>

                <div className="c-form-group u-mg-bottom-m">
                    <label className="c-label u-mg-bottom-xs" htmlFor="company">{content.company}</label>
                    <input className="c-input" value={state.formData.company} onChange={handleInputChange} id="company" name="company" type="text" required="" />
                </div>

                <div className="c-form-group u-mg-bottom-m">
                    <label className="c-label u-mg-bottom-xs" htmlFor="email">{content.email}</label>
                    {state.formError.email &&
                        <FadeInUp yOffset={10} delay={100}>
                            <p className="u-danger">{content.emailError}</p>
                        </FadeInUp>
                    }
                    <input className={"c-input " + (state.formError.email ? "has-error" : "")} value={state.formData.email} onChange={handleInputChange} id="email" name="email" type="email" required="" />
                </div>

                <div className="c-form-group u-mg-bottom-m">
                    <label className="c-label u-mg-bottom-xs" htmlFor="tel">{content.tel}</label>
                    <input className="c-input" value={state.formData.tel} onChange={handleInputChange} id="tel" name="tel" type="number" required="" />
                </div>

                <div className="c-form-group u-mg-bottom-m">
                    <label className="c-label u-mg-bottom-xs" htmlFor="message">{content.message}</label>
                    <textarea className="c-textarea" value={state.formData.message} onChange={handleInputChange} id="message" name="message" required="" />
                </div>

                {!state.formEvent.sending && !state.formEvent.sent &&
                    <AnimatedButton className="c-btn c-btn--primary-reverse u-mg-top-l" label={content.submit} onClick={(e) => handleSubmit(e)} />
                }
                {state.formEvent.sending && !state.formEvent.sent &&
                    <FadeInUp yOffset={50} delay={300} className="u-mg-top-l">
                        <p className="u-white">{content.sending}</p>
                    </FadeInUp>
                }
                {!state.formEvent.sending && state.formEvent.sent &&
                    <FadeInUp yOffset={50} delay={300} className="u-mg-top-l">
                        <p className="u-white">{content.sent}</p>
                    </FadeInUp>
                }

                {/* Button for dev */}
                {/* <button onClick={(e) => fillDevForm(e) }>Fill form</button> */}

            </form>
        </FadeInUp>
    </>
  )

}

export default Form
