import React, { Component } from 'react'
import { connect } from 'react-redux'
import Body from './components/Body'
import Faq from "react-faq-component";
import Slider from "react-slick";
import ReactImageFallback from "react-image-fallback";
import { MdVerifiedUser,MdInfoOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios'
import $ from "jquery";
// import Loader from "react-loader-spinner";
import Link from 'next/link'
import {Animated} from "react-animated-css";
import Head from 'next/head'
import Section21 from './components/home/Section21'
import Section22 from './components/home/Section22'
// import Section23 from './components/home/Section23'
import { Tab, Row, Col, Nav, Container } from 'react-bootstrap'
import { FaViruses, FaHandshake, FaSearch } from "react-icons/fa"
import { BiSupport } from "react-icons/bi"
import { AiOutlineFileProtect } from "react-icons/ai"
import { MdEditNote } from "react-icons/md"
import { BsTools } from "react-icons/bs"
 
    //=======SLIDER=======//
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        responsive: [
        {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
        },
        {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
        }
    
    ],
        customPaging: function(i) {
            return (
            <a></a>
            );
        },

    };


    //=======FAQ=======//
    const data = {
        // title: "FAQ (How it works)",
        rows: [
            {
                title: "Why do I need to verify Email?",
                content: <p>For an effective email marketing process, it is very important to verify the existence of 
                an email address so as to acquire a new subscriber. For this, you invest lots of time and money to 
                buy an email list from 3rd party vendors. But you are not sure whether these contact emails are 
                authentic enough to deliver your marketing campaign or not. If you send email messages to fake email 
                addresses, the bounce-back email ratio will increase and have a negative impact on your mail server’s 
                reputation. That’s why identifying and removing invalid 
                email addresses are essential to protect your email reputation and bounce-free email campaigns.
                <br /><br />By verifying email lists with our Email Extract Online tool, you can improve many of your options, such as:
                    <ul>
                        <li>•	Open Rates</li>
                        <li>•	Bounce Rates</li>
                        <li>•	Click-Through Rates</li>
                        <li>•	Conversion Rates</li>
                    </ul>
                </p>,
            },
            {
                title: "How accurate is the Email Extract Online?",
                content:
                    "The Email Extract Online uses the most comprehensive database of public email addresses to find the correct contact information. All the email addresses go through an email verification process before being returned. The email addresses with a green shield mean they have been checked and found deliverable. You can use them safely and those email addresses with red shields are either unauthorized or are not in use. "
                    ,
            },
            {
                title: "Can you verify Bulk emails at once?",
                content: `Yes, with the bulk extraction feature, you can verify an unlimited number of emails within seconds. `,
            },
            {
                title: "How protected are my emails, which I upload on your software, or do you share with any 3rd party?",
                content: "It's 100% protected and safe. Any emails you upload into our software can only be accessed by you after login, and we don’t have any access to that as it gets stored in your storage.",
            },
        ],
    };
    const data1 = {
        // title: "FAQ (How it works)",
        rows: [
            {
                title: "How fast is your email extraction tool?",
                content: `It’s absolutely super-fast and quick, which extracts and verifies emails within seconds on your PC.
                Note: The performance and speed also depend on your PC as well.`,
            },
            {
                title: "Do you offer a free trial to test the tool before buying it?",
                content:
                    <ul className="listing-faq">
                        <li>•	<b>10</b> Total Domain Search</li>
                        <li>•	<b>10</b> Total Email Search</li>
                        <li>•	<b>10</b> Total Email Verification</li>
                        <li>•	<b>15000</b> Bulk Domain Search</li>
                        <li>•	<b>500</b> Bulk Domain Upload</li>
                        <li>•	Unlimited Results</li>
                        <li>•	Unlimited Storage for free per user</li>
                    </ul>,
            },
            {
                title: "What should I do if the Email Finder doesn't return any result?",
                content: 
                <p>If the Email Finder can't find the email address, we recommend you to verify the following elements:
                    <ul className="listing-faq">
                        <li>•	Did you correctly enter the company or organization domain name for 
                            emails? In some cases, the domain name used for emails is different from the 
                            domain name used for the website.</li>
                        <li>•	Does the person you want to find still in the company or organization?</li>
                        <li>•	Have you misspelled the person's name?</li>

                    </ul>
                    <a>If the Email Finder is not able to find any result after verifying all these elements, you may be required to initiate a manual search</a>
                </p>
                
                
                
                
            },
            {
                title: "Why choose Email Extract Online over other email extract tools?",
                content: "We started Email Extract Online because we found that other similar services were charging a lot of money for data that is either publicly available on the internet or not authorized. Our goal is to help YOU find suitable leads and build a million-dollar business, and to do that you need to save time and as much money as you can. We want to bring people together so that they can provide value for each other, and we plan on doing that by providing the best Email Extract Online tool ever.",
            },
        ],
    };
    const styles = {
        // bgColor: 'white',
        titleTextColor: "blue",
        rowTitleColor: "blue",
        // rowContentColor: 'grey',
        // arrowColor: "red",
    };

    const config = {
        // animate: true,
        // arrowIcon: "V",
        // tabFocus: true
    };
    //=======FAQ=======//





export class index extends Component {

    constructor(props){
        super(props)
        this.state={
            mainformLoading:false,
            domain:'',
            foundemails:'',
            emailsdata:null
        }
        this.handleChange=this.handleChange.bind(this);
    }


    handleChange(e){
        this.setState({
            foundemails:'',
            emailsdata:null,
            [e.target.name]:e.target.value
        })
    }



    handleSubmit=e=>{
        e.preventDefault();
        // axios.get('')
        if(this.state.domain===''){
            toast.warning('Please enter the domain name', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
            $("#myForm :input").prop('readonly', true);
            this.setState({mainformLoading:true})

            axios.get(`${process.env.backendURL}/domainsearch/finddomain/${this.state.domain}/webuser`)
            .then(response=>{

                $("#myForm :input").prop('readonly', false);
                if(response.data.response){
                    this.setState({
                        foundemails:'found',
                        emailsdata:response.data,
                        mainformLoading:false,
                    })
                }else{
                    this.setState({
                        mainformLoading:false,
                        foundemails:'notfound',
                        emailsdata:response.data

                    })
                }

                
                console.log(response.data)
            })
        }
    }
    
    render() {
        return (

            <Body>

                <Head>
                    <title>Home</title>
                </Head>

            {/* 
                                =============================================
                                                Theme Hero Banner
                                ============================================== 
                                */}

                                <div style={{backgroundColor:'#f7faff'}}>
                                <div className="hero-banner-three">
                                    <div className="container">
                                    <div className="row">
                                        <div className="col-xl-9 col-lg-11 col-md-8 m-auto">
                                        <h1 className="font-rubik ban-head">STOP MANUAL, WE AUTOMATE ALL! <br/> BEST EMAIL EXTRACTOR 🚀</h1>
                                        </div>
                                        <div className="col-xl-8 col-lg-9 m-auto">
                                        <p className="sub-text font-rubik">Increase sales with the most powerful & easy-to-use email finding 
                                        tool. Email Extract Online lets you find and extract email addresses from any websites in seconds. Enter a domain to start For Free! </p>
                                        </div>
                                    </div>
                                    <div className="search-filter-form">
                                        {this.state.mainformLoading
                                            ?
                                            <center>
                                            <img src="https://cdn.dribbble.com/users/2450224/screenshots/4933013/adspy_loading_animation.gif" alt="asas" style={{height:'84px'}} />
                                                <h5>searching {this.state.domain}...</h5>
                                            </center>
                                            :
                                            <form onSubmit={this.handleSubmit} id='myForm' className="searchForm w-75">
                                                <input type="text" placeholder="company.com.." name="domain" value={this.state.domain} onChange={this.handleChange} />
                                                <button>Find Email Address</button>
                                            </form>
                                        }
                                        

                                        
                                    </div>

                                    {this.state.foundemails==='found'
                                    ?
                                        this.state.emailsdata.length>5
                                        ?
                                        <div className="row">
                                            <div className="col-xl-7 col-lg-9 col-md-12 m-auto">
                                            <div className="findemailshome">
                                                <h6>
                                                    
                                                
                                                    <ReactImageFallback
                                                    src={`https://logo.clearbit.com/${this.state.emailsdata.domain}`}
                                                    fallbackImage="https://www.freepnglogos.com/uploads/logo-website-png/logo-website-website-logo-png-transparent-background-background-15.png"
                                                    initialImage={`https://logo.clearbit.com/${this.state.emailsdata.domain}`}
                                                    alt="cool image should be here"
                                                    className="my-image" />


                                                    <span>{this.state.emailsdata.length} emails</span>  </h6>

                                                    <p>{this.state.emailsdata.emails[0].email}  {this.state.emailsdata.emails[0].email.verified?<span className="findemailshome_verified"><MdVerifiedUser /></span>:<span className="findemailshome_notverified"><MdInfoOutline /></span>}</p>
                                                    <p>{this.state.emailsdata.emails[1].email}  {this.state.emailsdata.emails[1].email.verified?<span className="findemailshome_verified"><MdVerifiedUser /></span>:<span className="findemailshome_notverified"><MdInfoOutline /></span>}</p>
                                                    <p>{this.state.emailsdata.emails[2].email}  {this.state.emailsdata.emails[2].email.verified?<span className="findemailshome_verified"><MdVerifiedUser /></span>:<span className="findemailshome_notverified"><MdInfoOutline /></span>}</p>
                                                    <p>{this.state.emailsdata.emails[3].email}  {this.state.emailsdata.emails[3].email.verified?<span className="findemailshome_verified"><MdVerifiedUser /></span>:<span className="findemailshome_notverified"><MdInfoOutline /></span>}</p>
                                                    <p>{this.state.emailsdata.emails[4].email}  {this.state.emailsdata.emails[4].email.verified?<span className="findemailshome_verified"><MdVerifiedUser /></span>:<span className="findemailshome_notverified"><MdInfoOutline /></span>}</p>
                                                    

                                                    <h5>and {this.state.emailsdata.length-5} more results</h5>
                                                    <hr />
                                                    <h3 className="addme">emailextractonline.com is completely FREE, Signup right now to get unlimited cutting edge lead generation.</h3>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="row">
                                            <div className="col-xl-7 col-lg-9 col-md-12 m-auto">
                                            <div className="findemailshome">
                                                <h6>
                                                    
                                                
                                                    <ReactImageFallback
                                                    src={`https://logo.clearbit.com/${this.state.emailsdata.domain}`}
                                                    fallbackImage="https://www.freepnglogos.com/uploads/logo-website-png/logo-website-website-logo-png-transparent-background-background-15.png"
                                                    initialImage={`https://logo.clearbit.com/${this.state.emailsdata.domain}`}
                                                    alt="cool image should be here"
                                                    className="my-image" />


                                                    <span>{this.state.emailsdata.length} emails</span>  </h6>

                        
                                                    {this.state.emailsdata.emails.map((email)=>{
                                                        return(
                                                            <p key={email.email}>{email.email}  {email.verified?<span className="findemailshome_verified"><MdVerifiedUser /></span>:<span className="findemailshome_notverified"><MdInfoOutline /></span>}  </p>
                                                             
                                                        )
                                                    })}

                                                    <hr />
                                                    <h3 className="addme">emailextractonline.com is completely FREE, Signup right now to get unlimited cutting edge lead generation.</h3>

                              
                                            </div>
                                            </div>
                                        </div>
        
                                    :
                                    <></>
                                    }


                                    {this.state.foundemails==='notfound'
                                    ?
                                    <div className="row">
                                        <div className="col-xl-7 col-lg-9 col-md-12 m-auto">
                                            <div className="notfindemailshome">
                                                <h5>Oh no! We couldnt find any leads for {this.state.emailsdata.domain}.</h5>
                                                <br />
                                                <p>our trackers are searching the internet for leads of the highest quality, unfortunately we dont have any for this company, YET. but rest assured, we are working on it.
                                                </p>
                                                <hr />
                                                <h3 className="addme">in the meantime, minelead.io is completely FREE, Signup right now to get unlimited cutting edge lead generation.</h3>
                                            </div>
                                        </div>
                                    </div>
                                    :<></>
                                    }
                                    


                                    

                                    

                                    
                                    <p className="sing-in-call mb-5">No Credit Card Required • Cancel Anytime • Get Started In Seconds • <Link href='/login'><a className="font-rubik">Sign in</a></Link>.</p>
                                
                                    </div> {/* /.container */}




                                    
                                    <img src="images/shape/68.svg" alt="" className="shapes shape-one" />
                                    <img src="images/shape/69.svg" alt="" className="shapes shape-two" />
                                    <img src="images/shape/70.svg" alt="" className="shapes shape-three" />
                                    <img src="images/shape/71.svg" alt="" className="shapes shape-four" />
                                    <img src="images/shape/72.svg" alt="" className="shapes shape-five" />
                                    <img src="images/shape/73.svg" alt="" className="shapes shape-six" />
                                    <img src="images/shape/74.svg" alt="" className="shapes shape-seven" />
                                    <img src="images/shape/75.svg" alt="" className="shapes shape-eight" />
                                    <img src="images/shape/76.svg" alt="" className="shapes shape-nine" />
                                    <img src="images/shape/77.svg" alt="" className="shapes shape-ten" />
                                </div>
                                </div>

                                {/* /.hero-banner-three */}




                                        {/* 
                    =============================================
                        Fancy Text Block Nineteen
                    ============================================== 
                    */}
                    
                    <div className="fancy-text-block-nineteen mt-150 mb-100 md-mt-150 md-mb-150">
                    <div className="container">
                        <div className="row align-items-center">
                        <div className="col-lg-6" data-aos="fade-right" data-aos-duration={1200}>
                            <img src="images/media/img_57.png" alt="" className="m-auto" />
                        </div>
                        <div className="col-lg-6" data-aos="fade-left" data-aos-duration={1200}>
                            <Animated animationIn="bounceInLeft" animationOut="fadeOut" animationInDelay='1500' isVisible={true}>
                            <div className="text-wrapper">
                            <div className="client-info font-rubik">Over <span>150,000+ client</span></div>
                            <div className="title-style-five">
                                <h2><span>Grow Your Network</span> In Automation.</h2>
                            </div>
                            <p className="font-rubik">From small businesses to FORTUNE 500** companies, over 150,000+ clients are using our quick and reliable Email Extract Online tool to find, 
                            extract & build high-quality leads from the internet in just one click.</p>
                            <p className="font-rubik">In short, it saves the hassle of collecting emails manually by running this 
                            process automatically, thereby providing you with a client database within seconds with confidence scores, 
                            department filters and detailed sources.</p>
                            {/* <div className="name font-slab">Sam Gibbs</div> */}
                            </div> {/* /.text-wrapper */}
                            </Animated>
                        </div>
                        </div>
                    </div>
                    </div> {/* /.fancy-text-block-nineteen */}
                    

                    {/*
                        =====================================================
                            Fancy Feature Eight Main
                        =====================================================
                    */}

                                {/*
                                            =====================================================
                                                Fancy Feature Eight
                                            =====================================================
                                            */}
                                <div className="fancy-feature-eight pt-100 md-pt-100">
                                    <div className="container">
                                    <div className="title-style-four text-center mb-60 md-mb-40">
                                        <div className="row">
                                            <div className="col-lg-10 m-auto">
                                                <h6>How it works</h6>
                                                <h2>Find verified email of any targeted&nbsp;
                                                <span>professional from their name and company.<img src="images/shape/line-shape-2.svg" alt="" /></span>
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                    
                                     {/* /.block-style-twelve */}
                                    </div>
                                </div> {/* /.fancy-feature-eight */}



                                <Section21 />
                                <Section22 />
                                {/* <Section23 /> */}
                                
                                

                                {/*
                                            =====================================================
                                                Fancy Feature Eight
                                            =====================================================
                                            */}
                                
                                
                                {/*
                                            =====================================================
                                                Useable Tools
                                            =====================================================
                                            */}
                                <div className="useable-tools-section-three mt-200 mb-200 md-mt-100 md-mb-80">
                                    <div className="container">
                                    <div className="row">
                                        <div className="col-lg-6">
                                        <div className="title-style-four">
                                            <h2>
                                            <span>Who is using ours <img src="images/shape/line-shape-10.svg" alt="" /></span>
                                            Email Extracter
                                            </h2>
                                        </div>
                                        <p className="sub-text">Deski ties into your existing tools, services, &amp; workflow. Get notifications or create story with others tools.</p>
                                        {/* <a href="#" className="all-button">See all partners <i className="flaticon-right-arrow" /></a> */}
                                        </div>
                                    </div>
                                    </div> {/* /.container */}
                                    <div className="logo-wrapper d-flex flex-wrap justify-content-center align-items-center">
                                    <div className="logo d-flex align-items-center justify-content-center"><img src="images/logo/logo-32.png" alt="" /></div>
                                    <div className="logo d-flex align-items-center justify-content-center"><img src="images/logo/logo-33.png" alt="" /></div>
                                    <div className="logo d-flex align-items-center justify-content-center"><img src="images/logo/logo-34.png" alt="" /></div>
                                    <div className="logo d-flex align-items-center justify-content-center"><img src="images/logo/logo-35.png" alt="" /></div>
                                    <div className="logo d-flex align-items-center justify-content-center"><img src="images/logo/logo-36.png" alt="" /></div>
                                    <div className="logo d-flex align-items-center justify-content-center"><img src="images/logo/logo-37.png" alt="" /></div>
                                    <div className="logo d-flex align-items-center justify-content-center"><img src="images/logo/logo-38.png" alt="" /></div>
                                    </div> {/* /.logo-wrapper */}
                                </div> {/* /.useable-tools-section-three */}
                                
                                
                                
                                {/* 
                                =============================================
                                    Fancy Feature Nineteen New
                                ============================================== 
                                */}

                                <div className="fancy-feature-nineteen-new">
                                    <Container>
                                        
                                    </Container>
                                </div>
                                
                                {/* 
                                =============================================
                                    Fancy Feature Nineteen
                                ============================================== 
                                */}
                    <div className="fancy-feature-nineteen mt-100 md-mt-100" id="effect">
                    <div className="container">
                        <div className="row">
                        <div className="col-xl-9 col-lg-11 m-auto" data-aos="fade-up" data-aos-duration={1200}>
                            <div className="title-style-eight text-center mb-80 md-mb-40">
                            <h2>We are enterprise-ready</h2>
                            <p>Explore advanced video editing features that only professionals have access to!</p>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        
                            <Row>
                                            <Col>
                                                <div className="fancy-feature-nineteen-new-inner text-center">
                                                    {/* <img src="images/availability1.png" alt="img-email" /> */}
                                                    <AiOutlineFileProtect />
                                                    <h5>Data Protection and Accuracy</h5>
                                                    <p>We don't share your information with any third party. 
                                                        We confirm that 99.5% of the data are correct.</p>
                                                </div>
                                            </Col>
                                            
                                            <Col>
                                                <div className="fancy-feature-nineteen-new-inner text-center">
                                                    {/* <img src="images/eu-gdpr-compliant1.png" alt="img-email" /> */}
                                                    <BiSupport />
                                                    <h5>Technical support 24/7</h5>
                                                    <p>Contact us anytime, 24 hours * 7 days, to get the most detailed answers to any of your questions.</p>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="fancy-feature-nineteen-new-inner text-center">
                                                    {/* <img src="images/working-with-enterprises1.png" alt="img-email" /> */}
                                                    <FaSearch />
                                                    <h5>Free trial</h5>
                                                    <p>Try any of the features of our tool for free before purchasing.</p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-5">
                                            <Col>
                                                <div className="fancy-feature-nineteen-new-inner text-center">
                                                    {/* <img src="images/integration-with-all-major-ats1.png" alt="img-email" /> */}
                                                    <FaViruses />
                                                    <h5>Malware free</h5>
                                                    <p>Whenever you download and install our tool, we guarantee the safety and security of your PC.</p>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="fancy-feature-nineteen-new-inner text-center">
                                                    {/* <img src="images/secured1.png" alt="img-email" /> */}
                                                    <MdEditNote />
                                                    <h5>GDPR compliant</h5>
                                                    <p>Though we are not a member of EU member states, yet all our products and services are GDPR compliant.</p>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="fancy-feature-nineteen-new-inner text-center">
                                                    {/* <img src="images/enabling-unbiased-hiring1.png" alt="img-email" /> */}
                                                    <FaHandshake />
                                                    <h5>Strongly recommended by independent sources</h5>
                                                    <p>All of our products are highly recommended by the professionals of small to large organizations.</p>
                                                </div>
                                            </Col>
                                        </Row>

                        </div>
                    </div>
                    </div> {/* /.fancy-feature-nineteen */}
                                
                                
                                


{/*
                                            =====================================================
                                                Client Feedback Slider Two
                                            =====================================================
                                            */}
                                <div className="client-feedback-slider-two mt-180 md-mt-100">
                                    <img src="images/shape/78.svg" alt="" className="shapes shape-one" />
                                    <img src="images/shape/79.svg" alt="" className="shapes shape-two" />
                                    <img src="images/shape/80.svg" alt="" className="shapes shape-three" />
                                    <img src="images/shape/81.svg" alt="" className="shapes shape-four" />
                                    <img src="images/shape/82.svg" alt="" className="shapes shape-five" />
                                    <img src="images/shape/83.svg" alt="" className="shapes shape-six" />
                                    <img src="images/shape/84.svg" alt="" className="shapes shape-seven" />
                                    <img src="images/shape/85.svg" alt="" className="shapes shape-eight" />
                                    <div className="container">
                                    <div className="title-style-four text-center mb-100 md-mb-60">
                                        <div className="row">
                                        <div className="col-lg-7 col-md-9 m-auto">
                                            <h6>Feedback</h6>
                                            <h2>What’s Our Client Say
                                            <span>About Us <img src="images/shape/line-shape-2.svg" alt="" /></span>
                                            </h2>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="">
                                    <div className="container">



                                    <Slider {...settings}>
                                    <div className="item">
                                        <div className="bg-wrapper">
                                            <img src="images/logo/logo-9.png" alt="" className="logo" />
                                            <p>Absolutely love it! I would like to say it is a brilliant tool for marketers like me. 
                                                I have tried a lot of other ones but only found lots of problems, bugs, incorrect harvesting, 
                                                constant blockages by servers. Email Extract Online is well programmed and it gets what you 
                                                really need. Definitely recommend it!</p>
                                            <div className="name font-rubik">Zubayer Hasan.</div>
                                            <div className="desig">CEO &amp; Founder Heloshape</div>
                                        </div> {/* /.bg-wrapper */}
                                        </div>
                                        <div className="item">
                                        <div className="bg-wrapper">
                                            <img src="images/logo/logo-10.png" alt="" className="logo" />
                                            <p>A huge thank you to the team at Email Extract Online. I bought this tool 6 months ago and even after all this time when I reach out for any help they are brilliant. So many online extracting products promise the world and then 
                                                fail to deliver - this is a robust tool and a great bunch of people behind it. Highly recommended.</p>
                                            <div className="name font-rubik">Eh Jewel</div>
                                            <div className="desig">Senior Developer</div>
                                        </div> {/* /.bg-wrapper */}
                                        </div>
                                        <div className="item">
                                        <div className="bg-wrapper">
                                            <img src="images/logo/logo-9.png" alt="" className="logo" />
                                            <p>My name is David, I tried Email Extract Online and Email Bulk Finder and found both of them to be very useful. The truth is unless you try this tool, you will not know what you are missing out on. I recommend the Email Extract Online tool to small and large businesses - it is profitable 
                                                especially when you want to develop reasonable contacts and good relationships with others.</p>
                                            <div className="name font-rubik">Johny Horoscope</div>
                                            <div className="desig">CEO &amp; Founder Heloshape</div>
                                        </div> {/* /.bg-wrapper */}
                                        </div>
                                        <div className="item">
                                        <div className="bg-wrapper">
                                            <img src="images/logo/logo-10.png" alt="" className="logo" />
                                            <p>Email Extract Online is very good and many thanks to the developers for making such an inexpensive 
                                                tool. Very frankly, after using this tool, I started seeing a big increase in my sales. In the past, 
                                                I tried many other resources as well as other email harvesters to boost my sales but nothing was as 
                                                effective as your product. I found your product 
                                                beyond my expectations. Once again I thank you for making such an effective product that really works.</p>
                                            <div className="name font-rubik">Eh Jewel</div>
                                            <div className="desig">Senior Developer</div>
                                        </div> {/* /.bg-wrapper */}
                                        </div>
                                        <div className="item">
                                        <div className="bg-wrapper">
                                            <img src="images/logo/logo-10.png" alt="" className="logo" />
                                            <p>I was looking for the best solution to extract emails of some prospective clients to promote my services. Finally, I found it: Email Extract Online. 
                                                Today I am really pleased with the way this tool works and the benefits, I get from email marketing.</p>
                                            <div className="name font-rubik">Eh Jewel</div>
                                            <div className="desig">Senior Developer</div>
                                        </div> {/* /.bg-wrapper */}
                                        </div>
                                        <div className="item">
                                        <div className="bg-wrapper">
                                            <img src="images/logo/logo-10.png" alt="" className="logo" />
                                            <p>I bought the Email Extract Online some time ago, it is so good that I felt like sharing. Email Extract Online is a small investment that can be made by any business but in a short period of time, it can really bring profits for your business. It helps to extract emails with superior potential 
                                                for reaching good customers. This software can be the best asset for any business. Highly recommended!</p>
                                            <div className="name font-rubik">Eh Jewel</div>
                                            <div className="desig">Senior Developer</div>
                                        </div> {/* /.bg-wrapper */}
                                        </div>
                                    </Slider>








                                        
                                        
                                    </div>
                                    </div> {/* /.slider-content */}
                                </div> {/* /.client-feedback-slider-two */}













                                
                                
                                
                                
                                
                                
                                {/*
                                            =====================================================
                                                Faq Classic
                                            =====================================================
                                            */}
                                <div className="faq-classic with-bg">
                                    <img src="images/shape/86.svg" alt="" className="shapes shape-one" />
                                    <img src="images/shape/87.svg" alt="" className="shapes shape-two" />
                                    <img src="images/shape/88.svg" alt="" className="shapes shape-three" />
                                    <img src="images/shape/89.svg" alt="" className="shapes shape-four" />
                                    <img src="images/shape/90.svg" alt="" className="shapes shape-five" />
                                    <img src="images/shape/91.svg" alt="" className="shapes shape-six" />
                                    <div className="container">
                                    <div className="title-style-four text-center mb-100 md-mb-70">
                                        <div className="row">
                                        <div className="col-lg-7 m-auto">
                                            <h6>FAQ’s</h6>
                                            <h2>
                                            <span>Questions &amp; Answers<img src="images/shape/line-shape-2.svg" alt="" /></span>
                                            </h2>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                        <Faq
                                            data={data}
                                            styles={styles}
                                            config={config}
                                        />
                                        </div>
                                        <div className="col-12">
                                        <Faq
                                            data={data1}
                                            styles={styles}
                                            config={config}
                                        />
                                        </div>
                                    </div>
                                    </div>
                                </div> {/* /.faq-classic */}
            
            </Body>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
