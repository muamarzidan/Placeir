import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import dataCard from "../../api/destionation";
import formatPrice from "../../utils/rupiahFormatter";
import "../../assets/css/components/popular.css"


export default function ExplorePage() {
    const [categoryType, setCategoryType] = useState("Semua");
    const [resizeIconStar, setResizeIconStar] = useState("16");
    const [resizeIconLoc, setResizeIconLoc] = useState("24");

    const handleCategoryClick = (category) => {
        setCategoryType(category);
    };

    const filterMostViewData = categoryType === "Semua"
        ? dataCard.sort((a, b) => b.viewCount - a.viewCount)
        : dataCard.filter(data => data.category === categoryType.toLowerCase());

    const handleResizeIcon = () => {
        if (window.innerWidth < 480) {
            setResizeIconStar("12");
            setResizeIconLoc("14");
        } else if (window.innerWidth < 768) {
            setResizeIconStar("14");
            setResizeIconLoc("18");
        } else {
            setResizeIconStar("16");
            setResizeIconLoc("24");
        }
    };

    useEffect(() => {
        handleResizeIcon();
        // important to add event listener on window when resize the width then resize the size of icon automatically
        window.addEventListener('resize', handleResizeIcon);
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResizeIcon);
        };
    }, []);

    return (
        <>
            <Navbar />
            <main className="w-full h-auto bg-white">
                <section id="hero" className="relative flex flex-col items-center justify-center h-[80vh] m-3 bg-center bg-cover rounded-xl bg-hero-explore-placeir">
                    <div className="absolute inset-0 bg-black rounded-xl opacity-35"></div>
                    <div className="relative px-3">
                        <h1 className="relative font-semibold text-center text-white px-0 sm:px-5 lg:px-[50px] xl:px-[100px] 2xl:px-[200px] text-5xl md:text-6xl xl:text-8xl">
                            Jelajahi Pesona Alam  Nusantara yang Menakjubkan
                        </h1>
                        <p className="relative text-md md:text-lg xl:text-2xl text-center px-2 sm:px-16 md:px-[50px] lg:px-[100px] xl:px-[220px] 2xl:px-[320px] text-white pt-5">Temukan destinasi menakjubkan di seluruh Nusantara. Rencanakan liburan  Anda sekarang dan temukan petualangan tak terlupakan di setiap sudut negeri.</p>
                    </div>
                </section>
                <section id="kategori" className="w-full h-auto py-10">
                    <div className="container flex flex-col w-full h-auto gap-4">
                        <h4 className="font-semibold text-[24px] text-secondary text-center">KATEGORI</h4>
                        <h3 className="text-6xl font-semibold text-center text-thridly">Destinasi Berdasarkan Provinsi</h3>
                        <div className="flex flex-wrap items-center justify-between w-full gap-5 pt-5 overflow-auto h-[200vh]">
                            {
                                dataCard.map((data, index) => (
                                    <div key={index} className="w-[445px] h-[460px] max-w-[800px] max-h-[430px] rounded-[30px] bg-center bg-cover" style={{ backgroundImage: `url(${data.thumbnailProvince})` }}>
                                        <div className="flex items-end w-full h-full p-5">
                                            <h4 className="text-6xl font-semibold text-white 0">{data.province}</h4>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
                <section id="jelajah" className="w-full h-auto pt-10 pb-20">
                    <div className="container flex flex-col items-center w-full h-auto gap-1 item">
                        <h4 className="font-semibold text-[24px] text-secondary text-center">JELAJAHI TEMPAT IMPIAN ANDA</h4>
                        <h3 className="text-6xl font-semibold text-center text-thridly">Temukan Destinasi Sesuai Keinginan Anda</h3>
                        <ul className="flex w-auto h-auto gap-3 pt-5 text-white">
                            {["Semua", "Alam", "Sejarah", "Kesenian"].map((category) => (
                                <li
                                    key={category}
                                    className={`px-5 py-2 font-semibold rounded-full cursor-pointer ${categoryType === category ? "bg-primary text-white" : "bg-gray-300 text-[#6F706F]"}`}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap items-center justify-between w-full h-auto gap-5 pt-5">
                            {filterMostViewData.map((data, index) => (
                                <div key={index} className="card-popular w-[250px] h-[306px] sm:w-[300px] sm:h-[356px] md:w-[350px] md:h-[406px] lg:w-full lg:h-[456px] max-w-[400px] max-h-[456px] flex flex-col justify-between p-3 rounded-3xl border-[1px] border-gray-300">
                                    <div
                                        className="w-[227px] h-[180px] sm:w-[277px] sm:h-[220px] md:w-[327px] md:h-[230px] lg:w-full lg:h-full !max-w-[377px] !max-h-[280px] p-3 rounded-xl"
                                        style={{
                                            backgroundImage: `url(${data.thumbnail})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    >
                                        <div className="flex items-center justify-evenly w-[67px] py-2 px-2 rounded-full bg-[#ffffff2b]">
                                            <Icon
                                                icon="mingcute:star-fill"
                                                style={{ color: "#ff9b48" }}
                                                width={resizeIconStar}
                                                height={resizeIconStar}
                                            />
                                            <span className="text-xs text-white sm:text-sm">{data.rating}</span>
                                        </div>
                                    </div>
                                    <span className="w-fit text-[#171717] font-bold sm:text-xl md:text-3xl">
                                        {data.name}
                                    </span>
                                    <div className="flex items-center gap-1 sm:gap-2 w-fit">
                                        <Icon
                                            icon="fluent:location-16-filled"
                                            style={{ color: "#4c82fe" }}
                                            width={resizeIconLoc}
                                            height={resizeIconLoc}
                                        />
                                        <span className="text-sm sm:text-md md:text-xl">
                                            {data.location}
                                            <a href={data.locationLink}></a>
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="font-bold text-md sm:text-[16px] md:text-[26px] text-[#171717]">
                                            {formatPrice(data.price)}
                                        </span>
                                        <button className="px-3 py-2 text-sm font-bold text-white rounded-full sm:px-5 md:py-3 sm:text-md md:text-lg bg-primary">
                                            Selengkapnya
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}