export interface ErrorBody extends Error {
    code: string;
  }
  
  export const errorMessages = {
    auth: {
      emailIncorrect: {
        message: 'Email is incorrect',
        code: '60000'
      },
      notFound: {
        message: 'Not found',
        code: '60000'
      },
      passwordIncorrect: {
        message: 'Password is incorrect',
        code: '60001'
      },
      wronCredentials: {
        message: 'wrong data provided',
        code: '60002',
      },
      userAlreadyExist: {
        message: 'Entered email already exist',
        code: '60003',
      },
      userNameAlreadyExist: {
        message: 'Entered full name already exist',
        code: '60003',
      },
      expiredToken: {
        message: 'token expired',
        code: '60003',
      },
      invlidToken: {
        message: 'invlid token',
        code: '60004',
      },
      notAllowed: {
        message: 'not allowed',
        code: '60005',
      },
    },
    user: {
      notFound: {
        message: 'user not found',
        code: '60101',
      },
    },
    role: {
      notFound: {
        message: 'role not found',
        code: '60201',
      },
    },
    category: {
      notFound: {
        message: 'category not found',
        code: '60301',
      },
    },
    cart: {
      notFound: {
        message: 'cart not found',
        code: '60301',
      },
    },
    payment: {
      notFound: {
        message: 'payment not found',
        code: '60501',
      },
    },
    paymentType: {
      notFound: {
        message: 'payment not found',
        code: '60501',
      },
    },
    coupon: {
      notFound: {
        message: 'coupon not found',
        code: '60201',
      },
      notActive: {
        message: 'coupon is not active anymore',
        code: '60201',
      },
    },
    order: {
      notFound: {
        message: 'order not found',
        code: '60201',
      },
      notOrderUser: {
        message: 'You cannot comment anything, because you have not ordered this item',
        code: '60201', 
      }
    },
    product: {
      notFound: {
        message: 'product not found',
        code: '60401',
      },
      notFulfilled: {
        message: 'not all product info is fulfilled',
        code: '60402',
      },
    },
    global: {
      internalError: {
        message: 'something went wrong',
        code: '70000',
      },
    },
  };