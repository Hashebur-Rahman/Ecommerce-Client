import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import CategoryProduct from "../../components/CategoryProduct/CategoryProduct";

const HomeFashion = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="Fashion Home"
        description="Fashion home of Shohojdokan."
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
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
