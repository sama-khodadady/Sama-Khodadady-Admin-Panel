import { FaArrowLeft } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

import { sp } from "utils/number";
import Layout from "layout/Layout";
import { useProduct } from "hooks/queries";
import Loader from "components/modules/Loader";

import styles from "./ProductDetailsPage.module.css";
import img from "assets/images/tshirt.jfif";

function ProductDetailsPage() {
  const { id } = useParams();
  const { data } = useProduct(id);
  const product = data?.data;

  if (!product) return <Loader />;

  return (
    <Layout>
      <div className={styles.details}>
        <img src={img} alt={product.name} />
        <div className={styles.info}>
          <h3>{product.name}</h3>
          <p className={styles.description}>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
          </p>
          <div>
            <span className={styles.price}>
              <span>{sp(product.price)} تومان </span>
              <IoMdPricetag />
            </span>
            <Link to="/">
              <span>بازگشت</span>
              <FaArrowLeft />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetailsPage;
