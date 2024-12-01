import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const CardLoader = () => {
    return (
      <SkeletonThemeCard>
        <div className="w-full  flex flex-col">
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
}

const SkeletonThemeCard = ({ children }) => {
    return (
        <SkeletonTheme baseColor="#eee" highlightColor="#fff">
            {children}
        </SkeletonTheme>
    )
}


export default CardLoader;