import { useState, useEffect } from "react";

export default function Variants({
  product,
  productSlug,
  handleURLChange,
  firstVariantOption,
  updateProductVariant,
}) {
  let { variant_options } = product?.data; // niz svih variant_options
  const { variant_items } = product?.data; // niz svih varijanti proizvoda
  let product_slug = productSlug; // slug proizvoda koji se prikazuje
  const [selected, setSelected] = useState([]); // niz selektovanih opcija
  const [variantOptions, setVariantOptions] = useState(variant_options); // niz variant_options koji se prikazuje

  useEffect(() => {
    const product = variant_items.find((item) => item.slug === productSlug);

    if (product) {
      updateProductVariant(product);

      product?.variant_key_array?.forEach((_, i) => {
        onChangeHandler(
          product?.variant_key_array[i]?.attribute_key,
          product?.variant_key_array[i]?.value_key
        );
      });
    }
  }, [productSlug]);

  useEffect(() => {
    // uzima item iz variant_items na osnovu slug-a
    let selected_item = getSelectedItem(product_slug);

    if (!selected_item) {
      selected_item = handleVariantFirstOption();
    }

    // ako postoji item iz variant_items na osnovu slug-a i setuje se selected
    // if (selected_item) {
    //   setSelected(selected_item?.variant_key_array);
    // }

    if (selected_item) {
      updateProductVariant(selected_item);
    }

    handleVariantOptionChange();
  }, [selected]);

  // setuje prve opcije variant_options-a ukoliko je firstVariantOption true
  const handleVariantFirstOption = () => {
    if (firstVariantOption && selected.length === 0) {
      product_slug = variant_items[0].slug;
      updateProductVariant(variant_items[0]);
      handleURLChange(product_slug);
      onChangeHandler(
        variant_items[0].variant_key_array[0].attribute_key,
        variant_items[0].variant_key_array[0].value_key
      );
    }
    return null;
  };

  //menja URL na osnovu selektovanih variant_options
  // useEffect(() => {
  //   handleURLChange(product_slug);
  // }, [product_slug]);

  // ako nema slug-a u URL-u, uzima prvi item iz variant_items i setuje ga kao selected
  useEffect(() => {
    const getProduct = () => {
      if (!product_slug) {
        const variant = getSelectedItem(product_slug);

        if (variant) {
          updateProductVariant(variant);
        }
      }
    };
    getProduct();
  }, [product_slug]);

  // uzima item iz variant_items na osnovu slug-a
  const getSelectedItem = (slug) => {
    let t_item = null;
    variant_items.map((item) => {
      if (item?.slug == slug) {
        t_item = item;
      }
    });
    return t_item;
  };

  // funkcija koja variant_options setuje vrednost selected_value, selected i display
  const setVariantOptionsVisible = (data) => {
    const options = [];
    data.map((item) => {
      const t_item = {
        attribute: item?.attribute,
        values: [],
      };

      t_item.attribute.selected_value = false;

      item.values.map((value) => {
        const t_val = value;
        t_val.display = "show";
        t_val.selected = false;

        t_item.values.push(t_val);
      });

      options.push(t_item);
    });

    return options;
  };

  // funkcija koja trazi variant_items koji odgovaraju selektovanim variant_options
  const getSelectedVariants = (selected, variant_items) => {
    const options = [];

    variant_items?.map((item) => {
      let t_count = 0;
      if (selected.length) {
        selected?.map((temp_condition) => {
          item.variant_key_array?.map((temp_variant_key_array) => {
            if (
              temp_condition?.attribute_key ==
                temp_variant_key_array?.attribute_key &&
              temp_condition.value_key == temp_variant_key_array?.value_key
            ) {
              t_count += 1;
            }
          });
        });
      }

      if (t_count == selected?.length) {
        options.push(item);
      }
    });

    return options;
  };

  // funkcija koja vraca proizvod na osnovu selektovanih variant_options
  const getProductVariant = () => {
    const options = getSelectedVariants(selected, variant_items);

    let product = [];

    if (options?.length == 1) {
      product.push(options[0]);
    }

    return product;
  };

  // funkcija koja oznacuje variant_options koja je selektovana
  const selectVariantOptions = (variant_options, attribute_key, value_key) => {
    variant_options.map((item) => {
      if (item?.attribute?.key == attribute_key) {
        item?.values?.map((value) => {
          if (value?.key == value_key) {
            value.selected = true;
            item.attribute.selected_value = true;
          }
        });
      }
    });
    return variant_options;
  };

  // funkcija koja vraca niz variant_options koji nisu selektovani
  const getNotSelectedVariantOptions = (variant_options) => {
    const options = [];
    variant_options?.map((item) => {
      if (!item?.attribute?.selected_value) {
        options?.push(item?.attribute?.key);
      }
    });
    return options;
  };

  // funkcija koja izbacuje duplikate iz niza
  const removeDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  };

  // funkcija koja vraca niz vrednosti za prikaz na osnovu selektovanih variant_options
  const setValuesFromVariantOptions = (
    selected_variants,
    temp_not_selected
  ) => {
    const options = [];
    selected_variants?.map((item) => {
      item?.variant_key_array?.map((variant_key_array) => {
        if (variant_key_array?.attribute_key == temp_not_selected) {
          options.push(variant_key_array?.value_key);
        }
      });
    });

    return removeDuplicates(options);
  };

  // funkcija koja postavlja vrednosti za prikaz na osnovu selektovanih variant_options
  const setValuesForShowToVariantOptions = (
    variant_options,
    temp_not_selected,
    values_to_show
  ) => {
    variant_options.map((item) => {
      if (item.attribute.key == temp_not_selected) {
        item?.values?.map((value) => {
          if (values_to_show.indexOf(value?.key) == -1) {
            value.display = "hide";
          } else {
            value.display = "show";
          }
        });
      }
    });

    return variant_options;
  };

  // funkcija koja menja stanje variant_options
  const handleVariantOptionChange = () => {
    variant_options = setVariantOptionsVisible(variant_options);
    if (selected?.length) {
      const check_selected = [];

      selected?.map((temp_select) => {
        variant_options = selectVariantOptions(
          variant_options,
          temp_select?.attribute_key,
          temp_select?.value_key
        );

        check_selected.push(temp_select);
        const selected_variants = getSelectedVariants(
          check_selected,
          variant_items
        );

        const not_selected = getNotSelectedVariantOptions(variant_options);

        if (not_selected.length) {
          not_selected.map((temp_not_selected) => {
            const values_to_show = setValuesFromVariantOptions(
              selected_variants,
              temp_not_selected
            );
            variant_options = setValuesForShowToVariantOptions(
              variant_options,
              temp_not_selected,
              values_to_show
            );
          });
        }
      });
    }

    setVariantOptions(variant_options);
  };

  // onChangeHandler funkcija za selektovanje variant_options nakon odabira vrednosti
  const onChangeHandler = (attribute_key, value_key) => {
    const temp_selected = selected;

    const temp_selected_item = {
      attribute_key: attribute_key,
      value_key: value_key,
    };

    const temp_index = temp_selected?.findIndex(
      (x) => x?.attribute_key == temp_selected_item?.attribute_key
    );

    if (temp_index > -1) {
      temp_selected[temp_index] = temp_selected_item;
      temp_selected.map((temp_selected_item, index) => {
        if (index > temp_index) {
          temp_selected.splice(index, temp_selected.length - index);
        }
      });
    } else {
      temp_selected?.push(temp_selected_item);
    }

    setSelected(temp_selected);
  };

  return (
    <div className="flex flex-row flex-wrap gap-[2rem]">
      {variantOptions.map((item) => {
        return (
          <div className="flex flex-col gap-2">
            <label htmlFor={item?.id} className={`font-semibold text-[0.9rem]`}>
              {item?.attribute?.name}
            </label>
            <select
              key={item?.id}
              id={item?.id}
              name={item?.attribute?.key}
              className="w-full rounded-2xl cursor-pointer border border-slate-200 focus:border focus:border-croonus-3 focus:ring-0 "
              onChange={(e) => {
                if (e.target.value !== "none") {
                  onChangeHandler(item?.attribute?.key, e.target.value);
                  handleVariantOptionChange();
                  const variant = getProductVariant();
                  if (variant) {
                    updateProductVariant(variant[0]);
                    handleURLChange(variant[0]?.slug);
                    product_slug = variant[0]?.slug;
                  } else {
                    updateProductVariant(null);
                  }
                }
              }}
            >
              <option value={"none"}>Izaberite</option>
              {item.values.map((value) => {
                const { display } = value;
                return (
                  <option
                    key={value.id}
                    value={value.key}
                    selected={value.selected}
                    style={{ display: value.display }}
                    className={display === "show" ? `block` : `hidden`}
                  >
                    {value.name}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}
    </div>
  );
}
