import { createSlice } from "@reduxjs/toolkit";
import { AdminProps } from "@/types";
import {
  deleteGuardRequest,
  getGuardRequest,
  getRequest,
  patchRequest,
  postGuardRequest,
  postGuardRequestMultipart,
  putGuardRequest,
} from "@/services/requestservice";
import { toast } from "react-toastify";

const initialState: AdminProps = {
  products: [],
  product: null,
  commentProduct: null,
  searchAdminProducts: [],
  categories: [],
  sliders: [],
  page: {},
  notificationPage: {},
  blogPage: {},
  colors: [],
  orders: [],
  blogs: [],
  loading: false,
  contactForms: [],
  notifications: [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload._embedded.productDtoes;
      state.page = action.payload.page;
    },
    getProduct: (state, action) => {
      state.product = action.payload;
    },
    getOrders: (state, action) => {
      state.orders = action.payload._embedded.orderDtoes;
      state.page = action.payload.page;
    },
    reduceOrders: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload,
      );
    },
    getCategories: (state, action) => {
      state.categories = action.payload;
    },
    getContactForms: (state, action) => {
      state.contactForms = action.payload;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload,
      );
    },
    getColors: (state, action) => {
      state.colors = action.payload;
    },
    getSliders: (state, action) => {
      state.sliders = action.payload;
    },
    updatedSlider: (state, action) => {
      state.sliders = state.sliders.filter(
        (item) => item.id !== action.payload,
      );
    },
    deleteContactMessage: (state, action) => {
      state.contactForms._embedded.contactDtoes =
        state.contactForms._embedded.contactDtoes.filter(
          (item) => item.id !== action.payload,
        );
    },
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((item) => item.id !== action.payload);
    },
    getBlogs: (state, action) => {
      state.blogs = action.payload._embedded.blogDtoes;
      state.blogPage = action.payload.page;
    },
    setOrderStatus: (state, action) => {
      let findOrder = state.orders.find(
        (item) => item.id === action.payload.id,
      );
      findOrder.status = action.payload.status;
    },
    setNewOrderToReturnWebsocket: (state, action) => {
      state.orders = [action.payload, ...state.orders];
    },
    setReplyList: (state, action) => {
      const comment = state.commentProduct.comments.find(
        (c) => c.id === action.payload.commentId,
      );
      comment.content.push({
        userName: action.payload.userName,
        message: action.payload.message,
      });
    },
    changeCommentStatus: (state, action) => {
      const comment = state.commentProduct.comments.find(
        (c) => c.id === action.payload.commentId,
      );
      comment.isActive = action.payload.status;
    },
    setCommentProduct: (state, action) => {
      state.commentProduct = action.payload;
    },
    setNewAdminCommentList: (state, action) => {
      state.commentProduct.comments = state.commentProduct.comments.filter(
        (c) => c.id !== action.payload.id,
      );
    },
    getNotifications: (state, action) => {
      state.notifications = action.payload._embedded.notifications;
      state.notificationPage = action.payload.page;
    },
    setNewNotificationToReturnWebsocket: (state, action) => {
      state.notifications = [action.payload, ...state.notifications];
    },
    setAdminSearchProducts: (state, action) => {
      state.searchAdminProducts = action.payload;
    },
    clearStateAdminSearchProducts: (state) => {
      state.searchAdminProducts = [];
    },
    deactivateNotifications: (state, action) => {
      state.notifications = state.notifications.forEach((n) => {
        n.isActive = false;
      });
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const deleteProductCommet =
  (productId: string, commentId: string) => async (dispatch) => {
    dispatch(loading(false));
    deleteGuardRequest({
      controller: "admin",
      action: "delete-product-comment",
      params: { productId: productId, commentId: commentId },
    })
      .then((res) => {
        dispatch(loading(false));
        toast.success(res.data.message);
      })
      .catch((err) => {
        dispatch(loading(false));
        toast.error(err.response.data);
      });
  };

export const AcceptComment =
  (productId: string, commentId: string) => async (dispatch) => {
    dispatch(loading(true));
    putGuardRequest({
      controller: "admin",
      action: "update-product-comment",
      params: { commentId: commentId, productId: productId },
    })
      .then((res) => {
        dispatch(loading(false));
        toast.success(res.data.message);
      })
      .catch((err) => {
        dispatch(loading(false));
        toast.error(err.response.data);
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const createCommentAdminResponse =
  (values, resetForm: () => void) => async () => {
    postGuardRequest({
      controller: "admin",
      action: "create-adminresponse",
      values,
    })
      .then((res) => {
        toast.success(res.data.message);
        resetForm();
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

export const createProductDispatch =
  (formData: FormData, resetForm: () => void) => async () => {
    postGuardRequest(
      { controller: "admin", action: "create-product" },
      formData,
    )
      .then((res) => {
        toast.success(res.data.message);
        resetForm();
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

export const updateProductDispatch =
  (formData: FormData) => async (dispatch) => {
    dispatch(loading(true));
    putGuardRequest({ controller: "admin", action: "update-product" }, formData)
      .then((res) => {
        dispatch(loading(false));
        toast.success(res.data.message);
      })
      .catch((err) => {
        dispatch(loading(false));
        toast.error(err.response.data);
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const updateActiveDispatch = (id, active) => async (dispatch) => {
  dispatch(loading(true));
  patchRequest({
    controller: "admin",
    action: "update-product-active",
    params: { productId: id, active: active },
  })
    .then((res) => {
      location.reload();
      toast.success(res.data.message);
      dispatch(loading(false));
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response.data);
    });
};

export const getAllProductDispatch =
  (page: number, size: number) => async (dispatch) => {
    dispatch(loading(true));
    getGuardRequest({
      controller: "admin",
      action: "get-all-product",
      params: { page: page, size: size },
    })
      .then((res) => {
        dispatch(getProducts(res?.data));
        dispatch(loading(false));
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const getProductDispatch = (id: string) => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({
    controller: "admin",
    action: "get-product",
    params: { id: id },
  })
    .then((res) => {
      dispatch(getProduct(res.data));
      dispatch(loading(false));
    })
    .catch((err) => {
      toast.error(err.response.data);
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

export const deleteProductDispatch = (id: string) => async (dispatch) => {
  dispatch(loading(true));
  deleteGuardRequest({
    controller: "admin",
    action: "delete-product",
    params: { id: id },
  })
    .then((res) => {
      toast.success(res.data.message);
      dispatch(deleteProduct(id));
      dispatch(loading(false));
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

export const createCategoryDispatch = (value: object) => async (dispatch) => {
  dispatch(loading(true));
  postGuardRequestMultipart(
    { controller: "admin", action: "create-category" },
    value,
  )
    .then((res) => {
      dispatch(loading(false));
      toast.success(res.data.message);
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response.data);
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

export const getCategoriesDispatch = () => async (dispatch) => {
  dispatch(loading(true));
  getRequest({ controller: "admin", action: "get-all-category" })
    .then((res) => {
      dispatch(getCategories(res.data));
      dispatch(loading(false));
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      dispatch(loading(false));
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

export const updatePriceByPercentageDispatch =
  (updatedValue: Number) => async (dispatch) => {
    putGuardRequest(
      { controller: "admin", action: "update-price-by-percentage" },
      { percentage: updatedValue },
    )
      .then((res) => {
        dispatch(loading(true));
        dispatch(getAllProductDispatch(0, 10));
        toast.success(res.data.message);
      })
      .catch((err) => {
        dispatch(loading(false));
        toast.error(err.response.data);
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const createColorDispatch = (value: object) => async (dispatch) => {
  dispatch(loading(true));
  postGuardRequest({ controller: "admin", action: "create-color" }, value)
    .then((res) => {
      dispatch(loading(false));
      dispatch(getAllColorsDispatch());
      toast.success(res.data?.message);
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response?.data);
    });
};

export const getAllColorsDispatch = () => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({ controller: "admin", action: "get-all-colors" })
    .then((res) => {
      dispatch(loading(false));
      dispatch(getColors(res?.data));
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response.data);
    });
};

export const deleteColorDispatch = (id: string) => async (dispatch) => {
  dispatch(loading(true));
  deleteGuardRequest({
    controller: "admin",
    action: "delete-color",
    params: { id: id },
  }).then((res) => {
    dispatch(loading(false));
    dispatch(getAllColorsDispatch());
    toast.success(res.data?.message);
  });
};

export const getAllOrdersDispatch =
  (page: number, size: number) => async (dispatch) => {
    dispatch(loading(true));
    getRequest({
      controller: "admin",
      action: "get-all-order",
      params: { page: page, size: size },
    })
      .then((res) => {
        dispatch(loading(false));
        dispatch(getOrders(res?.data));
      })
      .catch((err) => {
        dispatch(loading(false));
        toast.error(err.response?.data);
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const changeOrderStatusDispatch =
  (id: string, status: string) => async (dispatch) => {
    dispatch(loading(true));
    patchRequest({
      controller: "admin",
      action: "change-order-status",
      params: { orderId: id, status: status },
    })
      .then((res) => {
        dispatch(loading(false));
        dispatch(setOrderStatus({ id: id, status: status }));
        toast.success(res.data?.message);
      })
      .catch((err) => {
        dispatch(loading(false));
        toast.error(err.response?.data);
      });
  };

export const deleteOrderDispatch = (id: string) => async (dispatch) => {
  dispatch(loading(false));
  deleteGuardRequest({
    controller: "admin",
    action: "delete-order",
    params: { id: id },
  })
    .then((res) => {
      dispatch(loading(false));
      dispatch(reduceOrders(id));
      toast.success(res.data.message);
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response.data);
    });
};

export const createBlogDispatch =
  (value: object, resetForm: () => void, setImage) => async (dispatch) => {
    dispatch(loading(true));
    postGuardRequest({ controller: "admin", action: "create-blog" }, value)
      .then((res) => {
        dispatch(loading(false));
        resetForm();
        setImage(null);
        toast.success(res.data?.message);
      })
      .catch((err) => {
        dispatch(loading(false));
        toast.error(err.response?.data);
      });
  };

export const getAllBlogDispatch =
  (page: number, size: number) => async (dispatch) => {
    dispatch(loading(true));
    getGuardRequest({
      controller: "admin",
      action: "get-all-blog",
      params: { page: page, size: size },
    })
      .then((res) => {
        dispatch(loading(false));
        dispatch(getBlogs(res?.data));
      })
      .catch((err) => {
        dispatch(loading(false));
        toast.error(err.response?.data);
      });
  };

export const deleteBlogDispatch = (id: string) => async (dispatch) => {
  dispatch(loading(true));
  deleteGuardRequest({
    controller: "admin",
    action: "delete-blog",
    params: { id: id },
  }).then((res) => {
    dispatch(loading(false));
    dispatch(deleteBlog(id));
    toast.success(res.data?.message);
  });
};

export const createSliderDispatch = (formData) => async (dispatch) => {
  dispatch(loading(true));
  postGuardRequest({ controller: "admin", action: "create-slider" }, formData)
    .then((res) => {
      dispatch(loading(false));
      toast.success(res.data?.message);
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response?.data);
    });
};

export const deleteSliderDispatch = (id: string) => async (dispatch) => {
  dispatch(loading(true));
  deleteGuardRequest({
    controller: "admin",
    action: "delete-slider",
    params: { id: id },
  })
    .then((res) => {
      dispatch(loading(false));
      dispatch(updatedSlider(id));
      toast.success(res.data?.message);
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response?.data);
    });
};

export const getAllSliderImageDispatch = () => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({ controller: "admin", action: "get-all-slider" })
    .then((res) => {
      dispatch(loading(false));
      dispatch(getSliders(res?.data));
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response?.data);
    });
};

export const getAllContacts =
  (page: number, size: number) => async (dispatch) => {
    dispatch(loading(true));
    getGuardRequest({
      controller: "admin",
      action: "get-all-contact",
      params: { page: page, size: size },
    })
      .then((res) => {
        dispatch(loading(false));
        dispatch(getContactForms(res?.data));
      })
      .catch((err) => {
        dispatch(loading(false));
        toast.error(err.response?.data);
      });
  };

export const adminDeleteContactMessage = (id: string) => async (dispatch) => {
  dispatch(loading(true));
  deleteGuardRequest({
    controller: "admin",
    action: "delete-contact",
    params: { id: id },
  })
    .then((res) => {
      dispatch(loading(false));
      dispatch(deleteContactMessage(id));
      toast.success(res.data?.message);
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response?.data);
    });
};

export const replyCommentDispatch =
  (replyData: object, setMessages) => async (dispatch) => {
    dispatch(loading(true));
    patchRequest({ controller: "admin", action: "reply-comment" }, replyData)
      .then((res) => {
        dispatch(loading(false));
        toast.success(res.data?.message);
        setMessages({});
        dispatch(
          setReplyList({
            commentId: replyData.commentId,
            userName: "Arzuamber Moda",
            message: replyData.message,
          }),
        );
      })
      .catch((err) => {
        dispatch(loading(false));
        toast.error(err.response?.data);
      });
  };

export const deleteAdminCommentDispatch =
  (id: string, rateId: string) => async (dispatch) => {
    dispatch(loading(true));
    deleteGuardRequest({
      controller: "admin",
      action: "delete-comment",
      params: { commentId: id, rateId: rateId },
    })
      .then((res) => {
        dispatch(loading(false));
        dispatch(setNewAdminCommentList({ id: id }));
        toast.success(res.data?.message);
      })
      .catch((err) => {
        dispatch(loading(false));
        toast.error(err.response?.data);
      });
  };

export const changeCommentStatusDispatch =
  (id: string, status: boolean) => async (dispatch) => {
    dispatch(loading(true));
    patchRequest({
      controller: "admin",
      action: "change-comment-status",
      params: { commentId: id, status: status },
    })
      .then((res) => {
        dispatch(loading(false));
        toast.success(res.data?.message);
        dispatch(changeCommentStatus({ commentId: id, status: status }));
      })
      .catch((err) => {
        dispatch(loading(false));
        toast.error(err.response?.data);
      });
  };

export const getNotificationsDispatch =
  (page: number, size: number) => async (dispatch) => {
    getGuardRequest({
      controller: "admin",
      action: "get-notifications",
      params: { page: page, size: size },
    })
      .then((res) => {
        dispatch(getNotifications(res?.data));
      })
      .catch((err) => {
        toast.error(err.response?.data);
      });
  };

export const searchAdminProductDispatch =
  (searchTerm: string) => async (dispatch) => {
    dispatch(loading(true));
    getGuardRequest({
      controller: "admin",
      action: "search-product",
      params: { searchTerm: searchTerm },
    })
      .then((res) => {
        dispatch(loading(false));
        dispatch(setAdminSearchProducts(res?.data));
      })
      .catch((err) => {
        dispatch(loading(false));
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const deactivateNotificationsDispatch = () => async (dispatch) => {
  patchRequest({ controller: "admin", action: "deactivate-notifications" });
};

export const {
  loading,
  deleteProduct,
  getProducts,
  getProduct,
  getCategories,
  getColors,
  getOrders,
  getSliders,
  reduceOrders,
  updatedSlider,
  getContactForms,
  deleteContactMessage,
  deleteBlog,
  getBlogs,
  setOrderStatus,
  setNewOrderToReturnWebsocket,
  setCommentProduct,
  setReplyList,
  changeCommentStatus,
  setNewAdminCommentList,
  getNotifications,
  setNewNotificationToReturnWebsocket,
  setAdminSearchProducts,
  clearStateAdminSearchProducts,
  deactivateNotifications,
} = adminSlice.actions;
export default adminSlice.reducer;
