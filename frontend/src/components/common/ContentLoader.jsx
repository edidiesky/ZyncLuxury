import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ContentLoader = ({ type }) => {
  if (type === "dashboard_overview") {
    return (
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(4)
          .fill("")
          .map((_, index) => {
            return (
              <div
                key={index}
                className="w-full bg-white rounded-lg border h-[280px]"
              >
                <SkeletonThemeCard>
                  <div className="w-full p-3 h-[280px] pb-6 flex flex-col gap-4 justify-between">
                    <span className="w-full  h-[120px] lg:h-[175px]">
                      <Skeleton
                        style={{
                          borderRadius: "10px",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </span>
                    <div className="w-full flex flex-col gap-2">
                      <span className="w-[90%] h-[20px] lg:h-[20px]">
                        <Skeleton
                          style={{
                            borderRadius: "40px",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </span>
                      <div className="w-full flex items-center gap-4 justify-between">
                        <span className="w-[80%]  h-[15px] lg:h-[15px]">
                          <Skeleton
                            style={{
                              borderRadius: "40px",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </span>
                        <span className="w-[50px]  h-[15px] lg:h-[15px]">
                          <Skeleton
                            style={{
                              borderRadius: "40px",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </SkeletonThemeCard>
              </div>
            );
          })}
      </div>
    );
  }
  if (type === "dashboard") {
    return (
      <div className="w-full flex flex-col gap-12">
        <div className="w-full bg-white rounded-lg border">
          {Array(4)
            .fill("")
            .map((_, index) => {
              return (
                <div key={index} className="w-full border-b">
                  <SkeletonThemeCard>
                    <div className="w-full flex items-center justify-between">
                      <div className="w-full p-4 flex items-center gap-4">
                        <span className="h-[20px]  w-[120px] lg:w-[190px]">
                          <Skeleton
                            style={{
                              borderRadius: "10px",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </span>
                        <span className="h-[20px]  w-[40px] lg:w-[50px]">
                          <Skeleton
                            style={{
                              borderRadius: "40px",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </span>
                        <span className="h-[20px]  w-[30px] lg:w-[120px]">
                          <Skeleton
                            style={{
                              borderRadius: "10px",
                              width: "80%",
                              height: "100%",
                            }}
                          />
                        </span>
                        <span className="h-[20px]  w-[50px] lg:w-[80px]">
                          <Skeleton
                            style={{
                              borderRadius: "10px",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </span>
                      </div>
                      <div className="w-full p-4 flex items-center justify-end gap-4">
                        <span className="h-[20px] w-[80px] lg:w-[120px]">
                          <Skeleton
                            style={{
                              borderRadius: "10px",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </span>
                        <span className="h-[20px] lg:block hidden w-[40px]">
                          <Skeleton
                            style={{
                              borderRadius: "40px",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </span>
                        <span className="h-[20px] lg:block hidden w-[70px]">
                          <Skeleton
                            style={{
                              borderRadius: "10px",
                              width: "80%",
                              height: "100%",
                            }}
                          />
                        </span>
                        <span className="h-[20px] lg:block hidden w-[30px]">
                          <Skeleton
                            style={{
                              borderRadius: "10px",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  </SkeletonThemeCard>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
  if (type === "dashboard_card") {
    return (
      <div className="w-full grid grid-cols-2 gap-8 lg:grid-cols-4">
        {Array(4)
          .fill("")
          .map((_, index) => {
            return (
              <div
                key={index}
                className="w-full bg-white border rounded-2xl overflow-hidden min-h-[120px] border-b"
              >
                <SkeletonThemeCard>
                  <div className="min-h-[220px] p-4 pb-8 justify-between flex flex-col gap-8 w-full">
                    <div className="w-full flex flex-col gap-1">
                      <span className="h-[15px] rounded-xl w-[80%]">
                        <Skeleton
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </span>
                      <span className="h-[10px] rounded-xl w-[60%]">
                        <Skeleton
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </span>
                    </div>
                    <div className="w-full flex flex-col gap-1">
                      <span className="h-[35px] rounded-xl w-[80%]">
                        <Skeleton
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </span>
                      <span className="h-[7px] rounded-xl w-[60%]">
                        <Skeleton
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </span>
                    </div>

                    <div className="w-full flex items-center justify-between gap-1">
                      <span className="h-[10px] rounded-xl w-[40%]">
                        <Skeleton
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </span>
                      <div className="w-[70%] justify-end flex items-center gap-1">
                        <span className="h-[7px] rounded-xl w-[30%]">
                          <Skeleton
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </span>
                        <span className="h-[10px] rounded-xl w-[10px]">
                          <Skeleton
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </SkeletonThemeCard>
              </div>
            );
          })}
      </div>
    );
  }

  if (type === "modals") {
    return (
      <div className="w-full h-full bg-white rounded-2xl overflow-hidden min-h-full border-b">
        <SkeletonThemeCard>
          <div className="min-h-[220px] p-4 pb-8 justify-between flex flex-col gap-8 w-full">
            <div className="w-full flex flex-col gap-1">
              <span className="h-[15px] rounded-xl w-[80%]">
                <Skeleton
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </span>
              <span className="h-[10px] rounded-xl w-[60%]">
                <Skeleton
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </span>
            </div>
            <div className="w-full flex flex-col gap-1">
              <span className="h-[35px] rounded-xl w-[80%]">
                <Skeleton
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </span>
              <span className="h-[7px] rounded-xl w-[60%]">
                <Skeleton
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </span>
            </div>

            <div className="w-full flex items-center justify-between gap-1">
              <span className="h-[10px] rounded-xl w-[40%]">
                <Skeleton
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </span>
              <div className="w-[70%] justify-end flex items-center gap-1">
                <span className="h-[7px] rounded-xl w-[30%]">
                  <Skeleton
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </span>
                <span className="h-[10px] rounded-xl w-[10px]">
                  <Skeleton
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </SkeletonThemeCard>
      </div>
    );
  }

  return (
    <SkeletonThemeCard>
      <div className="w-full flex flex-col">
        <span className="h-[240px] w-full">
          <Skeleton
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </span>
        <div className="w-full border rounded-b-xl flex p-6 flex-col gap-4">
          <div className="w-full flex items-center gap-4 justify-between">
            <div className="w-full flex flex-col gap-2">
              <span className="h-[12px] w-full">
                <Skeleton
                  style={{
                    borderRadius: "10px",
                    width: "80%",
                    height: "100%",
                  }}
                />
              </span>
              <span className="h-[12px]">
                <Skeleton
                  style={{
                    borderRadius: "12px",
                    width: "60%",
                    height: "100%",
                  }}
                />
              </span>
              <span className="h-[12px]">
                <Skeleton
                  style={{
                    borderRadius: "10px",
                    width: "50%",
                    height: "100%",
                  }}
                />
              </span>
            </div>
            <span className="h-[30px] w-[70px]">
              <Skeleton
                style={{
                  borderRadius: "100px",
                  width: "100%",
                  height: "100%",
                }}
              />
            </span>
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="h-[12px] w-full">
              <Skeleton
                style={{
                  borderRadius: "10px",
                  width: "80%",
                  height: "100%",
                }}
              />
            </span>
            <span className="h-[12px]">
              <Skeleton
                style={{
                  borderRadius: "12px",
                  width: "60%",
                  height: "100%",
                }}
              />
            </span>
            <span className="h-[12px]">
              <Skeleton
                style={{
                  borderRadius: "10px",
                  width: "50%",
                  height: "100%",
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </SkeletonThemeCard>
  );
};

export const SkeletonThemeCard = ({ children }) => {
  return (
    <SkeletonTheme baseColor="#eee" highlightColor="#fff">
      {children}
    </SkeletonTheme>
  );
};

export default ContentLoader;
