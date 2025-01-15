"use client";
import { useState, useEffect, useCallback } from "react";
import { get, post, list } from "@/app/api/api";
import Link from "next/link";
import Logo from "../../assets/Images/Reflekta-logo.png";
import dynamic from "next/dynamic";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useSearchParams } from "next/navigation";
import Image from "next/image";


const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [error, setError] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const params = useSearchParams();
  const slug = params.get("slug");
  const [product, setProduct] = useState(null);
  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const getData = await list(`/static-pages/content/kontakt-strana`).then(
        (res) => {
          console.log(res);
          setData(res?.payload);
        }
      );
    };

    getData();
  }, []);

  const staticData = data?.items?.map((item) => {
    return item;
  });
  
  const [formData, setFormData] = useState({
    page_section: "reflekta_contact_page",
    customer_name: "",
    phone: "",
    email: "",
    mail_to: "",
    subject: "",
    company_sector: "",
    message: "",
    accept_rules: false,
    gcaptcha: token,
  });
  const [formFileds, setFormFields] = useState({});
  const [message, setMessage] = useState({ error: false, content: null });
  useEffect(() => {
    if (slug) {
      const getProduct = async (slug) => {
        const getProduct = await get(
          `/product-details/basic-data/${slug}`
        ).then((res) => {
          setProduct(res?.payload);
          setFormData({
            page_section: "reflekta_contact_page",
            customer_name: "",
            phone: "",
            email: "",
            mail_to: "",
            subject: `Upit za proizvod ${product?.data?.item?.basic_data?.name}`,
            company_sector: "",
            message: `Poštovani, \n\nMolim Vas da na datu e-mail adresu pošaljete ponudu za proizvod ${product?.data?.item?.basic_data?.name}.\n\nHvala.`,
            accept_rules: false,
            gcaptcha: token,
          });
        });
      };
      getProduct(slug);
    } else return;
  }, [slug, product?.data?.item?.basic_data?.name]);
  const formChangeHandler = ({ target }) => {
    setMessage({ error: false, content: null });
    if (target.name === "company_sector") {
      const mail = formFileds?.company_sector?.ddl_options.filter(
        (item) => item.id === target.value
      )[0].mail_to;

      setFormData({ ...formData, company_sector: target.value, mail_to: mail });
    } else {
      setFormData({
        ...formData,
        [target.name]:
          target.type === "checkbox" ? target.checked : target.value,
      });
    }
  };

  useEffect(() => {
    get(`/contact/contact_page?form_section=reflekta_contact_page`)
      .then((response) => setFormFields(response?.payload))
      .catch((error) => console.warn(error));
  }, []);
  useEffect(() => {
    setFormData({ ...formData, gcaptcha: token });
  }, [token]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (loading) return;
    setError(true);

    for (const item in formData) {
      if (
        formData[item] === "" &&
        formFileds[item]?.fields_rule?.includes("required")
      ) {
        setMessage({
          error: true,
          content: "Nisu popunjena sva obavezna polja!",
        });
        return;
      }
    }

    if (!formData.accept_rules) {
      setMessage({ error: true, content: "Morate prihvatiti uslove!" });
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setMessage({
        error: true,
        content: "Molimo unesite validnu e-mail adresu.",
      });
      return;
    }

    setLoading(true);
    setRefreshReCaptcha((r) => !r);

    post("contact/contact_page?form_section=reflekta_contact_page", formData)
      .then((response) => {
        if (response?.success !== true) {
          setError(true);
          setMessage({
            error: true,
            content: "Došlo je do greške, molimo Vas pokušajte ponovo.",
          });
          return;
        }

        setMessage({
          error: false,
          content: "Uspešno ste poslali poruku, uskoro ćemo Vas kontaktirati.",
        });

        setFormData({
          ...formData,
          page_section: "reflekta_contact_page",
          customer_name: "",
          phone: "",
          email: "",
          mail_to: "",
          subject: "",
          company_sector: "",
          message: "",
          accept_rules: false,
          gcaptcha: token,
        });

        setLoading(false);
        setError(false);
      })
      .catch((error) => console.warn(error));
  };
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHAKEY}>
      <GoogleReCaptcha
        onVerify={verifyCaptcha}
        refreshReCaptcha={refreshReCaptcha}
      />

      <div className="mx-auto 4xl:container contactHolder">
        <div className="mx-auto grid grid-cols-6 gap-y-3 gap-x-3 mt-8">
          <div className="col-span-6 bg-white p-1 sm:col-span-3 pt-[3rem] pb-[1rem] md:px-20 px-2">
            <div className="contactFormHolder h-[100%]">
              {error ? (
                <>
                  <h3 className="text-2xl mb-6">Pišite nam</h3>
                  <p>
                    Ukoliko imate bilo kakvih pitanja, slobodno nam se obratite.
                  </p>
                  <form onSubmit={(e) => onSubmitHandler(e)}>
                    <input
                      type="text"
                      value={formData.customer_name}
                      name="customer_name"
                      className="max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg w-full my-2"
                      placeholder="Ime i prezime"
                      onChange={formChangeHandler}
                    />

                    <input
                      type="text"
                      value={formData.email}
                      name="email"
                      className="max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg w-full mb-1"
                      placeholder="E-mail adresa"
                      onChange={formChangeHandler}
                    />
                    <input
                      type="text"
                      value={formData.phone}
                      name="phone"
                      className="max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg w-full mb-1"
                      placeholder="Broj telefona"
                      onChange={formChangeHandler}
                    />
                    <input
                      type="text"
                      value={formData.subject}
                      name="subject"
                      className=" max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg w-full mb-1"
                      placeholder="Naslov poruke"
                      onChange={formChangeHandler}
                    />
                    <textarea
                      type="text"
                      value={formData.message}
                      name="message"
                      className="max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg w-full mb-1"
                      placeholder="Poruka"
                      rows={"5"}
                      onChange={formChangeHandler}
                    />
                    <div className="checkboxContainer">
                      <input
                        id="acceptance"
                        type="checkbox"
                        className=" checkbox"
                        name="accept_rules"
                        checked={formData.accept_rules}
                        onChange={formChangeHandler}
                      />
                      <label className="checkboxLabel" htmlFor="acceptance">
                        Upoznat sam i slažem se sa sadržajem disklejmera.
                        Sadržaj disklejmera možete pogledati na{" "}
                        <Link href="/strana/politika-privatnosti" className="underline">
                          Pročitaj uslove
                        </Link>
                      </label>
                    </div>
                    {message.content && (
                      <p
                        className={
                          message.error ? "error-message" : "success-message"
                        }
                      >
                        {message.content}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="max-lg:-right-3 px-5 py-2 text-base bg-croonus-3 text-white flex ml-auto mt-[1rem] hover:bg-opacity-[70%] rounded-lg"
                      onClick={onSubmitHandler}
                    >
                      {" "}
                      {loading ? (
                        <img
                          src={"/icons/loading-buffering.gif"}
                          className="loaderImg"
                        />
                      ) : (
                        "Pošalji poruku"
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="messHolder h-[100%]">
                  <img
                    src="/icons/successmessage.png"
                    alt={process.env.COMPANY}
                    className=" h-[60px] ml-auto mr-auto"
                  />
                  <p className="ml-auto mr-auto mt-6">
                    Uspešno ste poslali poruku! Uskoro ćemo Vas kontaktirati
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-6 bg-croonus-2 text-white p-1 sm:col-span-3 py-14 md:px-20 px-8 rounded-lg md:mr-5 max-md:mx-2">
            <div className="companyInfoHolder">
              <h3 className="text-2xl mb-8">
                <Image src={Logo} alt={``} width={200} />
              </h3>
              {staticData?.map((item) => {
              return (
                <div dangerouslySetInnerHTML={{ __html: item?.content }}></div>
              )
              })}
              <div className="socialNetworkHolder flex">
                <div className="circleHolder">
                  <Link
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands text-white fa-instagram" />
                  </Link>
                </div>
                <div className="circleHolder">
                  <Link
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands text-white fa-facebook " />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default ContactPage;
