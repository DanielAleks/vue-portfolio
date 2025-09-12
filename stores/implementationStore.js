import { defineStore } from "pinia";
import { ref, watchEffect, watch } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { SowImplementationTypesQuery } from "src/graphql/query/sow/SowImplementationType.js";
import { SowGuidelinesQuery } from "src/graphql/query/sow/SowGuideline.js";
import { SowProductsQuery } from "src/graphql/query/sow/SowProduct.js";
import { SowServicesQuery } from "src/graphql/query/sow/SowService.js";
import { SowServiceBundlesQuery } from "src/graphql/query/sow/SowServiceBundle.js";
import {
  UpdateSowImplementationTypeMutation,
  DeleteSowImplementationTypeMutation,
  RestoreSowImplementationTypeMutation,
} from "src/graphql/mutation/sow/SowImplementationType.js";
import {
  UpdateSowGuidelineMutation,
  DeleteSowGuidelineMutation,
} from "src/graphql/mutation/sow/SowGuideline.js";
import {
  UpdateSowServiceMutation,
  DeleteSowServiceMutation,
} from "src/graphql/mutation/sow/SowService.js";
import {
  UpdateSowServiceBundleMutation,
  DeleteSowServiceBundleMutation,
} from "src/graphql/mutation/sow/SowServiceBundle.js";
import {
  UpdateSowProductMutation,
  DeleteSowProductMutation,
} from "src/graphql/mutation/sow/SowProduct.js";
import { useQuasar } from "quasar";

export const useImplementationStore = defineStore({
  id: "implementation",
  state: () => ({
    sowImplementations: [],
    sowGuidelines: [],
    sowProducts: [],
    sowServices: [],
    sowServiceBundles: [],
    sowID: null,
    pushNewResponseData: null,
    $q: useQuasar(),
    initialLoad: true,
  }),
  actions: {
    onSetValueCallback(callback) {
      this.pushNewResponseData = callback;
    },
    setSowID(id) {
      this.sowID = id;
    },

    async fetchSowImplementations() {
      const maxUpdates = ref(0);
      const {
        result: sowImplementationsData,
        refetch: refetchImplementationTotals,
      } = useQuery(SowImplementationTypesQuery, () => ({
        sow_idNew: this.sowID,
      }));

      if (!this.initialLoad) {
        refetchImplementationTotals();
      }

      setTimeout(() => {
        this.initialLoad = false;
      }, 3000);

      watchEffect(() => {
        if (
          sowImplementationsData.value &&
          sowImplementationsData.value.SowImplementationTypes.data &&
          maxUpdates.value < 2
        ) {
          maxUpdates.value++;
          const newData =
            sowImplementationsData.value.SowImplementationTypes.data.map(
              (item, index) => ({
                ...item,
                showProdServ: ref(false),
                isProdServices: false,
                isEditing: false,
                index: index,
                Name: item.sow_detail ? item.sow_detail : item.Name,

              })
            );
          this.sowImplementations = newData.sort((a, b) => a.sow_order - b.sow_order);
        }
      });
    },
    async fetchSowGuidelines() {
      const { result: sowGuidelinesData, refetch: refetchSowGuidelines } =
        useQuery(SowGuidelinesQuery, () => ({
          sow_idNew: this.sowID,
        }));

      if (!this.initialLoad) {
        refetchSowGuidelines();
      }

      watch(() => sowGuidelinesData.value, () => {
        if (sowGuidelinesData.value) {
          const newData = sowGuidelinesData.value.SowGuidelines.data.map(
            (item, id) => ({
              ...item,
              type: "Guideline",
              index: id,
              Name: item.sow_detail ? item.sow_detail : item.Name,
              editingValue: ref(""),
              Quantity: item.quantity,
              IsOptional: item.IsOptional ? item.IsOptional : false,
            })
          );
          this.sowGuidelines = newData;
          newData.forEach((item) => {
            if (
              item.BillingFrequency !== "One-Time" &&
              !this.sowServices.some((service) => service._id === item._id)
            ) {
              this.sowServices.push({
                ...item,
                FixedPrice: item.UnitPrice,
                type: "Guideline",
                index: item.index,
              });
            }
          });
        }
      });
    },
    async fetchSowProducts() {
      const maxUpdates = ref(0);
      const { result: sowProductsData, refetch: refetchSowProducts } = useQuery(
        SowProductsQuery,
        () => ({
          sow_idNew: this.sowID,
        })
      );

      if (!this.initialLoad) {
        refetchSowProducts();
      }

      watch(() => sowProductsData.value, () => {
        // maxUpdates.value < 1 &&
        // && (this.sowProducts.length === 0 ||
        //   sowProductsData.value.SowProducts.data.length !==
        //     this.sowProducts.length)
        if (
          sowProductsData.value
        ) {
          console.log(sowProductsData.value.SowProducts.data, "SOW Products in watchEffect() STORE.js");
          const newData = sowProductsData.value.SowProducts.data.map(
            (item, id) => ({
              ...item,
              FixedPrice: item.UnitPrice,
              type: "Product",
              index: id,
              IsOptional: item.IsOptional ? item.IsOptional : false,
            })
          );

          maxUpdates.value++;
          this.sowProducts = newData;
          newData.forEach((item) => {
            if (
              item.BillingFrequency !== "One-Time" &&
              !this.sowServices.some((service) => service.Name === item.Name)
            ) {
              this.sowServices.push({
                ...item,
                FixedPrice: item.UnitPrice,
                type: "Product",
                index: item.index,
              });
            }
          });
        }
      });
    },
    async fetchSowServices() {
      const { result: sowServicesData, refetch: refetchSowServices } = useQuery(
        SowServicesQuery,
        () => ({
          sow_idNew: this.sowID,
        })
      );

      if (!this.initialLoad) {
        refetchSowServices();
      }
      const maxUpdates = ref(0);

      watch(() => sowServicesData.value, () => {
        if (sowServicesData.value) {
          console.log("SOW Services in STORE.js", sowServicesData.value);
          const newData = sowServicesData.value.SowServices.data.map(
            (item, id) => ({
              ...item,
              FixedPrice: item.UnitPrice,
              type: "Service",
              index: id,
            })
          );
          this.sowServices = newData.filter(
            (item) => !this.sowServices.some((service) => item.Name === service.Name)
          );
          this.sowProducts.forEach((item) => {
            if (
              item.BillingFrequency === "One-Time" &&
              !this.sowServices.some((service) => service.Name === item.Name)
            ) {
              this.sowServices.push({
                ...item,
                FixedPrice: item.UnitPrice,
                type: "Product",
                index: item.index,
              });
            }
          });
          maxUpdates.value++;
        }
      })
    },
    async fetchSowServiceBundles() {
      const maxUpdates = ref(0);
      const {
        result: sowServiceBundleData,
        refetch: refetchSowServiceBundles,
      } = useQuery(SowServiceBundlesQuery, () => ({
        sow_idNew: this.sowID,
      }));

      if (!this.initialLoad) {
        refetchSowServiceBundles();
      }

      watch(() => sowServiceBundleData.value, () => {
        if (sowServiceBundleData.value) {
          console.log(sowServiceBundleData.value, "SOW Service Bundles in watchEffect() STORE.js");
          const newData = sowServiceBundleData.value.SowServiceBundles.data.map(
            (item, id) => ({
              ...item,
              FixedPrice: item.UnitPrice,
              type: "ServiceBundle",
              index: id,
            })
          );

          this.sowServiceBundles = newData;
          this.sowServiceBundles.forEach((item) => {
            if (!this.sowServices.some((service) => service._id === item._id)) {
              this.sowServices.push({
                ...item,
                FixedPrice: item.UnitPrice,
                type: "ServiceBundle",
                index: item.index,
              });
            }
          });

          // this.sowServices = newData.filter(
          //   (item) => item._id !== this.sowServices.some((service) => service._id)
          // );
          maxUpdates.value++;
        }
      })
    },

    // mutations UPDATE DELETE

    async updateSowImplementation(item, updateType, newOrderIndex) {
      try {
        let variables = {
          _id: item._id,
          sow_idNew: this.sowID,
        };
        if (typeof updateType === "boolean") {
          variables = { ...variables, IsOptional: updateType };
          this.sowGuidelines = this.sowGuidelines.map((guideline) => {
            if (
              guideline.ImplementationTypeID === item.implementation_type_id
            ) {
              guideline.IsOptional = updateType;
              this.updateSowGuideline({
                row: guideline,
                field: "IsOptional",
                dontUpdate: true,
              });
            }
            return guideline;
          });
        } else if (updateType === "order") {
          variables = { ...variables, sow_order: newOrderIndex };
        } else {
          variables = { ...variables, sow_detail: updateType };
        }

        const { mutate: updateImple } = useMutation(
          UpdateSowImplementationTypeMutation
        );
        const { data } = await updateImple(variables);
        this.sowImplementations = this.sowImplementations.map((item) => {
          if (item._id === data.UpdateSowImplementationTypeMutation._id) {
            item.sow_detail =
              data.UpdateSowImplementationTypeMutation.sow_detail;
            item.sow_order = newOrderIndex
          }
          return item;
        });
        const updateImplementation = data.UpdateSowImplementationTypeMutation;
        if (updateType !== "order") {
        this.pushNewResponseData(
          "implementation",
          "update",
          updateImplementation
        );
        }
      } catch (error) {
        console.error(error);
      }
    },

    async deleteImplementation(id) {
      try {
        const variables = {
          _id: id,
        };

        const { mutate: deleteImple } = useMutation(
          DeleteSowImplementationTypeMutation
        );

        const { data } = await deleteImple(variables);
        const deletedImple = data.DeleteSowImplementationTypeMutation;

        this.sowImplementations = this.sowImplementations.filter(
          (item) => item._id !== deletedImple._id
        );
        this.sowGuidelines = this.sowGuidelines.filter(
          (item) => item.ImplementationTypeID !== deletedImple._id
        );
        this.sowProducts = this.sowProducts.filter(
          (item) => item.SowImplementationTypeID !== deletedImple._id
        );
        this.sowServices = this.sowServices.filter(
          (item) =>
            item.SowImplementationTypeName !== deletedImple.Name ||
            item.ImplementationTypeID !== deletedImple._id
        );

        this.pushNewResponseData("implementation", "delete", deletedImple);
        this.$q.notify({
          message: "Implementation Deleted: " + deletedImple.Name,
          color: "indigo-7",
          textColor: "white",
          icon: "delete",
          position: "bottom",
          timeout: 5000,
          actions: [
            {
              color: "white",
              handler: () => this.restoreImplementation(id),
              label: "Undo",
              icon: "undo",
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    },

    async restoreImplementation(id) {
      try {
        const variables = {
          _id: id,
        };

        const { mutate: restoreImple } = useMutation(
          RestoreSowImplementationTypeMutation
        );

        const { data } = await restoreImple(variables);
        const restoredImplementation =
          data.RestoreSowImplementationTypeMutation;

        this.pushNewResponseData(
          "implementation",
          "create",
          restoredImplementation
        );
        this.$q.notify({
          message: "Implementation Restored: " + restoredImplementation.Name,
          color: "green-7",
          textColor: "white",
          icon: "done",
          position: "bottom",
          timeout: 2000,
        });
        // setTimeout(() => {
        //   this.$q.notify({
        //     message: "Not all items are loaded in yet, please refresh",
        //     color: "red-7",
        //     textColor: "white",
        //     icon: "warning",
        //     position: "bottom",
        //     timeout: 5000,
        //     actions: [
        //       {
        //         color: "white",
        //         handler: () => document.location.reload(),
        //         label: "Refresh",
        //         icon: "refresh",
        //       },
        //     ],
        //   });
        // }, 1000);
      } catch (error) {
        console.error(error);
      }
    },

    async updateSowGuideline({ row, field, dontUpdate }) {
      // dontUpdate: reactively sets products/services to optional or alreadyImplemented
      try {
        console.log("updateSowGuideline", row, field, row.sow_order)
        let variables = {
          _id: row._id,
        };
        switch (field) {
          case "Name":
            console.log("NAME", row.sow_order, "row.index", row.index)

          variables = { ...variables, sow_detail: row.Name };
            break;
          case "Quantity":
            console.log("QTY", row.sow_order, "row.index", row.index)

            variables = { ...variables, quantity: parseInt(row.Quantity) };
            break;
          case "PriceOverride":
            console.log("PRICEOVERRIDE", row.sow_order, "row.index", row.index)

            variables = {
              ...variables,
              PriceOverride: row.UnitPrice,
            };
            break;
          case "sow_order":
            console.log(row.Name, row.sow_order)
            variables = {
              ...variables,
              sow_order: row.sow_order,
            };
            break;
          case "IsOptional":
            variables = { ...variables, IsOptional: row.IsOptional };
            // sets guideline related products/services to optional or alreadyImplemented
            function setRelatedToOptional(type) {
              type = type.map((item) => {
                if (item.sow_guideline_idNew === row._id) {
                  item.IsOptional = row.IsOptional;
                }
                return item;
              });
            }
            setRelatedToOptional(this.sowProducts);
            setRelatedToOptional(this.sowServices);
            // setRelatedToOptional(this.tableSowServices);
            break;
          case "IsAlreadyImplemented":
            variables = {
              ...variables,
              IsAlreadyImplemented:
                row.IsAlreadyImplemented === 1 ? true : false,
            };
            this.sowProducts = this.sowProducts.map((item) => {
              if (item.sow_guideline_idNew === row._id) {
                item.IsAlreadyImplemented = row.IsAlreadyImplemented;
              }
              return item;
            });
            break;
        }

        const { mutate: updateG } = useMutation(UpdateSowGuidelineMutation);
        if (!dontUpdate) {
          const { data } = await updateG(variables);
          const updateGuideline = data.UpdateSowGuidelineMutation;
          console.log(updateGuideline, "guideline update response data");
          if (field !== "sow_order") {
          this.pushNewResponseData("guideline", "update", {
            ...updateGuideline,
            LineTotal: updateGuideline.LineTotal,
          });
        };
        }
      } catch (error) {
        console.error(error);
      }
    },

    async deleteSowGuideline(row) {
      try {
        const variables = {
          _id: row._id,
        };

        const { mutate: deleteG } = useMutation(DeleteSowGuidelineMutation);

        const { data } = await deleteG(variables);
        const deletedGuideline = data.DeleteSowGuidelineMutation;
        this.sowGuidelines = this.sowGuidelines.filter(
          (item) => item._id !== deletedGuideline._id
        );
        this.sowProducts = this.sowProducts.filter(
          (item) => item.sow_guideline_idNew !== deletedGuideline._id
        );
        this.sowServices = this.sowServices.filter(
          (item) => item.sow_guideline_idNew !== deletedGuideline._id
        );
        this.sowServiceBundles = this.sowServiceBundles.filter(
          (item) => item.sow_guideline_idNew !== deletedGuideline._id
        );
        this.pushNewResponseData("guideline", "delete", deletedGuideline);
        // if (row.HasSowProducts || row.HasSowServices) {
        //   refetchComponentType(row.HasSowProducts, row.HasSowServices);
        // }
      } catch (error) {
        console.error(error);
      }
    },

    async updateSowProduct({ row, field }) {
      try {
        let variables = {
          _id: row._id,
        };

        switch (field) {
          case "Name":
            variables = { ...variables, sow_detail: row.Name };
            break;
          case "Quantity":
            variables = { ...variables, Quantity: parseInt(row.Quantity) };
            break;
          case "IsOptional":
            variables = { ...variables, IsOptional: row.IsOptional };
            break;
          case "sow_order":
            variables = {
              ...variables,
              sow_order: row.sow_order,
            };
            break;
          case "PriceOverride":
            if (row.SowGuidelineName === "Multiple") {
              variables = {
                ...variables,
                PriceOverride: row.UnitPrice,
                product_id: row.product_id,
                sow_implementation_type_id: row.SowImplementationTypeID,
              };
            } else {
              variables = {
                ...variables,
                PriceOverride: row.UnitPrice,
              };
            }
            break;
        }

        const { mutate: updateProductMutation } = useMutation(
          UpdateSowProductMutation
        );

        const { data } = await updateProductMutation(variables);
        const product = data.UpdateSowProductMutation;
        console.log(product, "updateSowProduct()")
        if (field !== "sow_order") {
          this.pushNewResponseData("product", "update", product);
          } else console.log(product.Name, "SowProduct Updated, sow_order: ", product.sow_order);
      } catch (error) {
        console.error(error);
      }
    },

    async deleteSowProduct(row) {
      try {
        let variables = { _id: row._id };

        const { mutate: deleteProduct } = useMutation(DeleteSowProductMutation);

        const { data } = await deleteProduct(variables);

        const deletedProduct = data.DeleteSowProductMutation;
        this.sowProducts = this.sowProducts.filter(
          (item) => item._id !== deletedProduct._id
        );
        this.pushNewResponseData("product", "delete", deletedProduct);
      } catch (error) {
        console.error(error);
      }
    },

    async updateSowService({ row, field }) {
      try {
        let variables = {
          _id: row._id,
        };

        switch (field) {
          case "Quantity":
            variables = { ...variables, Quantity: parseInt(row.Quantity) };
            break;
          case "IsOptional":
            variables = { ...variables, IsOptional: row.IsOptional };
            break;
          case "sow_order":
            variables = {
              ...variables,
              sow_order: row.sow_order,
            };
            break;
            case "SetupFeeOverride":
              variables = {
                ...variables,
                SetupFeeOverride: row.UnitSetupFee,
              };
              break;
          case "PriceOverride":
            if (row.SowGuidelineName === "Multiple") {
              variables = {
                ...variables,
                PriceOverride: row.UnitPrice,
                service_id: row.service_id,
                sow_implementation_type_id: row.SowImplementationTypeID,
              };
            } else {
              variables = {
                ...variables,
                PriceOverride: row.UnitPrice,
              };
            }
            break;
        }

        const { mutate: updateServiceMutation } = useMutation(
          UpdateSowServiceMutation
        );

        const { data } = await updateServiceMutation(variables);

        const service = data.UpdateSowServiceMutation;
        if (field !== "sow_order") {
        this.pushNewResponseData("service", "update", service);
        } else console.log(service.Name, "SowService Updated, sow_order: ", service.sow_order);
      } catch (error) {
        console.error(error);
      }
    },

    async deleteSowService(row) {
      try {
        const { mutate: deleteService } = useMutation(DeleteSowServiceMutation);

        const { data } = await deleteService({ _id: row._id });
        const service = data.DeleteSowServiceMutation;
        this.sowServices = this.sowServices.filter(
          (item) => item._id !== service._id
        );
        this.pushNewResponseData("service", "delete", service);
      } catch (error) {
        console.error(error);
      }
    },

    async updateSowServiceBundle({ row, field }) {
      console.log(row, field, "updateSowServiceBundle")
      try {
        let variables = {
          _id: row._id,
        };

        switch (field) {
          case "Quantity":
            variables = { ...variables, Quantity: parseInt(row.Quantity) };
            break;
          case "sow_order":
            variables = {
              ...variables,
              sow_order: row.sow_order,
            };
            break;
          case "PriceOverride":
            variables = {
              ...variables,
              PriceOverride: row.UnitPrice,
            };
            break;
            case "SetupFeeOverride":
              variables = {
                ...variables,
                SetupFeeOverride: row.UnitSetupFee,
              };
              break;
        }

        const { mutate: updateSowServiceBundleMutation } = useMutation(
          UpdateSowServiceBundleMutation
        );

        const { data } = await updateSowServiceBundleMutation(variables);
        const serviceBundle = data.UpdateSowServiceBundleMutation;
        if (field !== "sow_order") {
        this.pushNewResponseData("service", "update", serviceBundle);
          } else console.log(serviceBundle.Name, "SowBUNDLE Updated, sow_order: ", serviceBundle.sow_order);
      } catch (error) {
        console.error(error);
      }
    },

    async deleteSowServiceBundle(row) {
      try {
        const { mutate: deleteServiceBundle } = useMutation(
          DeleteSowServiceBundleMutation
        );

        const { data } = await deleteServiceBundle({ _id: row._id });
        const serviceBundle = data.DeleteSowServiceBundleMutation;
        this.sowServices = this.sowServices.filter(
          (item) => item._id !== row._id
        );
        this.sowServiceBundles = this.sowServiceBundles.filter(
          (item) => item._id !== serviceBundle._id
        );
        this.pushNewResponseData("service", "delete", serviceBundle);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
