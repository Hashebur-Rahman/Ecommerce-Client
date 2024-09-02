import { Fragment, useEffect } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import CategoryProduct from "../../components/CategoryProduct/CategoryProduct";

const HomeFashion = () => {
  useEffect(() => {
    const isReloaded = sessionStorage.getItem("isCategoryReload");
    if (!isReloaded) {
      console.log("ssss");
      window.location.reload();
      sessionStorage.setItem("isCategoryReload", true);
    }
    return () => {
      sessionStorage.removeItem("isCategoryReload");
    };
  }, []);

  return (
    <Fragment>
      <SEO
        titleTemplate="Fashion Home"
        description="Fashion home of Shohoj Dokan Online shop BD."
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* hero slider */}
        <HeroSliderOne />

        {/* featured icon */}
        <CategoryProduct />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60 pt-40" category="fashion" />

        {/* blog featured */}
        {/* <BlogFeatured spaceBottomClass="pb-55" /> */}
        <FeatureIcon spaceTopClass="pt-50" spaceBottomClass="pb-60" />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
