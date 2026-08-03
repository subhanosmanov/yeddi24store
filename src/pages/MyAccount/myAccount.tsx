import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./myAccount.scss";
import { FaLock } from 'react-icons/fa';
import { MdAssignmentReturn, MdDiscount } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';

// 1. Şemanı komponentin xaricində də təyin edə bilərsən
const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Ad Çox Qısadır!')
        .max(50, 'Ad Çox Qısadır!')
        .required('Mütləq Doldurulmalıdır'),
    lastName: Yup.string()
        .min(2, 'Çox qısadır!')
        .max(50, 'Çox uzundur!')
        .required('Mütləq doldurulmalıdır'),
    email: Yup.string()
        .email('Yanlış e-poçt ünvanı')
        .required('Mütləq doldurulmalıdır'),
    password: Yup.string()
        .min(6, 'Şifrə ən az 6 simvol olmalıdır')
        .required('Mütləq doldurulmalıdır'),
    // Yup.ref() ilə şifrələrin eyniliyini yoxlayırıq:
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), "null"], 'Şifrələr eyni deyil!')
        .required('Mütləq doldurulmalıdır'),
});

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

function MyAccount() {

    const formik = useFormik({
        initialValues,
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            console.log('Form məlumatları:', values);
        },
    });

    function formClick() {
        console.log(formik);
    }

    return (
        <div className='my-account'>
            <div className="my-account__layout">
                <div className="my-account__header">
                    <h3 className="my-account__title">Sign In/Register</h3>
                    <div className="my-account__protect">
                        <FaLock />
                        <p>Your data is protected.</p>
                    </div>
                </div>
                <div className="my-account__banner">
                    <div className="my-account__banner-list">
                        <div className="my-account__banner-item">
                            <MdDiscount />
                            <h5>Get 30% Off</h5>
                            <p>First Order</p>
                        </div>
                        <div className="my-account__banner-item">
                            <TbTruckDelivery />
                            <h5>Free Shipping</h5>
                            <span>Conditions Apply</span>
                        </div>
                        <div className="my-account__banner-item">
                            <MdAssignmentReturn />
                            <h5>Free Returns</h5>
                            <span>Conditions Apply</span>
                        </div>
                    </div>
                </div>
                <div className="my-account__content">
                    <form className='my-account__form'>
                        <div className="my-account__form-content">
                            <label htmlFor="firstName">Adınızı yazın:</label>
                            <input type="text"
                                id="firstName"
                                {...formik.getFieldProps('firstName')} />
                            {formik.errors.firstName && formik.touched.firstName ?
                                <span className='my-account__error'>{formik.errors.firstName}</span>
                                : null}
                        </div>
                        <div className="my-account__form-content">
                            <label htmlFor="lastName">Soyadınızı yazın:</label>
                            <input type="text"
                                id="lastName"
                                {...formik.getFieldProps('lastName')} />
                            {formik.errors.lastName && formik.touched.lastName ?
                                <span className='my-account__error'>{formik.errors.lastName}</span>
                                : null}
                        </div>
                        <div className="my-account__form-content">
                            <label htmlFor="email">Emailinizi yazın:</label>
                            <input type="text"
                                id="email"
                                {...formik.getFieldProps('email')} />
                            {formik.errors.email && formik.touched.email ?
                                <span className='my-account__error'>{formik.errors.email}</span>
                                : null}
                        </div>
                        <div className="my-account__form-content">
                            <label htmlFor="password">Şifrənizi yazın:</label>
                            <input type="text"
                                id="password"
                                {...formik.getFieldProps('password')} />
                            {formik.errors.password && formik.touched.password ?
                                <span className='my-account__error'>{formik.errors.password}</span>
                                : null}
                        </div>
                        <div className="my-account__form-content">
                            <label htmlFor="confirmPassword">Şifrənizi təkrar yazın:</label>
                            <input type="text"
                                id="confirmPassword"
                                {...formik.getFieldProps('confirmPassword')} />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword ?
                                <span className='my-account__error'>{formik.errors.confirmPassword}</span>
                                : null}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;