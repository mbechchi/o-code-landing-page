import React from "react";
import { useStaticQuery, graphql } from "gatsby"
import Loadable from "react-loadable"

import { ModalContextConsumer } from "../components/context/modalContext"

import Modal from "../components/modal"
import AnimatedButton from "../components/button"

const ButtonFormModal = ({ btnClassName, btnLabel, ...props }) => {
    return (
        <ModalContextConsumer>
            {({ toggleOpenModal }) =>
                <AnimatedButton className={btnClassName} label={btnLabel} onClick={toggleOpenModal} {...props} />
            }
        </ModalContextConsumer>
    )
};

// The Form component is dependent of the AWS SDK.
// This SDK is too heavy to be loaded on  the forst load (~2mo)
// React-loadable makes it only be loaded when needed
const LoadForm = Loadable({
    loader: () => import("../components/form"),
    render(loaded, props) {
      let Form = loaded.default;
      return <Form {...props} />;
    },
    loading() {
      return <div></div>
    }
});

export const formPictureFragment = graphql`
  fragment formPictureFragment on File {
    childImageSharp {
      fixed(width: 100, height: 100, quality: 100) {
        ...GatsbyImageSharpFixed_withWebp
      }
    }
  }
`
const FormModal = ({ modalClassName, ...props }) => {

    const data = useStaticQuery(graphql`
      query {
        allContentJson {
          edges {
            node {
                form {
                    email
                    emailError
                    message
                    name
                    submit
                    tel
                    company
                    title
                    sending
                    sent
                }
            }
          }
        }
        formPicture: file(relativePath: { eq: "images/form/photo-jean-baptiste-pondevy.jpeg" }) { ...formPictureFragment },
      }
  `);

    const content = data.allContentJson.edges[0].node.form

    return (
        <ModalContextConsumer>
            {({ modalOpen, toggleOpenModal }) =>
                <Modal open={modalOpen} onClose={toggleOpenModal} modalClassName={modalClassName} {...props}>
                    <LoadForm content={content} picture={data.formPicture} />
                </Modal>
            }
        </ModalContextConsumer>
    )
};

export { ButtonFormModal, FormModal };


