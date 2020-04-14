import React, { useState  } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { wrap } from "@popmotion/popcorn";
import { motion, AnimatePresence } from "framer-motion";

import CodeFrame from "../components/svg/codeFrame"

export const testimonialPictureFragment = graphql`
  fragment testimonialPictureFragment on File {
    childImageSharp {
      fixed(width: 210, height: 210, quality: 90) {
        ...GatsbyImageSharpFixed_withWebp
      }
    }
  }
`

const testimonialContentVariants = {
    enter: () => ({
        y: 50,
        opacity: 0
    }),
    center: () => ({
        zIndex: 1,
        y: 0,
        opacity: 1
    }),
    exit: () => ({
        zIndex: 0,
        y: 50,
        opacity: 0
    })
};

const testimonialPictureVariants = {
    enter: () => ({
        scale: 0,
        opacity: 0
    }),
    center: () => ({
        scale: 1,
        opacity: 1
    }),
    exit: () => ({
        scale: 0,
        opacity: 0
    })
};

const Testimonials = () => {

    const data = useStaticQuery(graphql`
        query {
            allContentJson {
                edges {
                    node {
                        global {
                            header {
                                navigation {
                                    testimonials
                                }
                            }
                        }
                        home {
                            testimonials {
                                title
                            }
                        }
                    }
                }
            }
            allTestimonialsJson {
                edges {
                  node {
                    testimonials {
                      job
                      name
                      quote
                      pic
                      title
                    }
                  }
                }
            }
            testimonialsPictures: allFile(
                filter: {
                    extension: {regex: "/(jpg)|(jpeg)|(png)/"},
                    relativeDirectory: {eq: "images/testimonials"}
                }
            ) {
                nodes {
                  name
                  ...testimonialPictureFragment
                }
            }
        }
    `);

    // const content = data.allContentJson.edges[0].node.home.testimonials
    const testimonials = data.allTestimonialsJson.edges[0].node.testimonials
    const global = data.allContentJson.edges[0].node.global

    // Slide management
    const [slideIndex, setSlideIndex] = useState(0);

    const index = wrap(0, testimonials.length, slideIndex);
    const picture = data.testimonialsPictures.nodes.filter((el) => el.name === testimonials[index].pic)[0];

    const paginate = (newDirectionFactor) => {
        if (slideIndex + newDirectionFactor < testimonials.length && slideIndex + newDirectionFactor >= 0) {
            setSlideIndex(slideIndex + newDirectionFactor);
        }
        else if (slideIndex + newDirectionFactor === testimonials.length) {
            setSlideIndex(0);
        }
        else if (slideIndex + newDirectionFactor === -1) {
            setSlideIndex(testimonials.length - 1);
        }
    };

    // Swipe distance
    const swipeConfidenceThreshold = 100;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <>
            <div className="u-pd-left-3col@main">
                <div className="u-pd-hz-l">
                    <div className="c-subtitle u-flex u-flex-center-vt u-mg-bottom-m">
                        <span className="c-bullet u-mg-right-m"></span>
                        {global.header.navigation.testimonials}
                    </div>
                </div>
            </div>

            <div className="c-testimonial">
                <AnimatePresence initial={false}>

                    <>

                        <div className="u-pd-left-3col@main">
                            <motion.div
                                key={"testimonial-title-" + index}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={testimonialPictureVariants}>
                                    <h3 className="c-h3 u-pd-hz-l u-mg-bottom-l">{testimonials[index].title}</h3>
                            </motion.div>
                        </div>

                        <div className="l-grid">

                            <div className="l-col-12 l-col-3@main u-pd-hz-xxl u-pd-left-0@main u-pd-right-l@main">
                                <motion.div
                                    key={"testimonial-picture-" + index}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={testimonialPictureVariants}>
                                        { picture && <CodeFrame className="c-testimonial__picture" fixedPicture={picture.childImageSharp.fixed} /> }
                                </motion.div>
                            </div>

                            <div className="l-col-12 l-col-8@main u-pd-hz-l">

                                <motion.div
                                    className="c-testimonial__content u-draggable u-mg-bottom-l"
                                    key={"testimonial-content" + index}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={testimonialContentVariants}
                                    drag
                                    dragConstraints={{ top: 0, bottom: 0, right: 0, left: 0 }}
                                    dragElastic={0.1}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const axis = (Math.abs(offset.x * velocity.x) > Math.abs(offset.y * velocity.y)) ? 'x' : 'y';
                                        const swipe = (axis === 'x') ? swipePower(offset.x, velocity.x) : swipePower(offset.y, velocity.y);
                                        if (swipe < swipeConfidenceThreshold) {
                                            paginate(1);
                                        } else if (swipe > -swipeConfidenceThreshold) {
                                            paginate(-1);
                                        }
                                    }}>

                                    {testimonials[index].quote.map((jtem, jndex) => (
                                        <p className="u-mg-bottom-s" key={"testimonial-quote-" + jndex}>{jtem}</p>
                                    ))}

                                </motion.div>

                                <motion.div
                                    className="c-testimonial__author"
                                    key={"testimonial-author" + index}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={testimonialContentVariants}>

                                    <p className="u-bold">{testimonials[index].name}</p>
                                    <p className="u-medium">{testimonials[index].job}</p>

                                </motion.div>

                            </div>

                            <div className="l-col-12 l-col-1@main u-flex u-flex-dir-col@main u-flex-center-vt u-flex-center-hz u-flex-start@main">
                                {testimonials.map((item, i) => (
                                    <div className={"c-bullet c-bullet--big u-mg-s u-clickable " + (i === slideIndex ? '' : 'c-bullet--empty')}
                                        key={'bullet' + i}
                                        role = "button"
                                        tabIndex="0"
                                        aria-label={"Témoignage n°" + (i+1)}
                                        onClick={() => { setSlideIndex(i); }}
                                        onKeyDown={() => { setSlideIndex(i); }}>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </>

                </AnimatePresence>
            </div>

        </>
    )
}

export default Testimonials
