import { useEffect, useState } from "react";
import { OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { UpCircleArrow } from "../assets/icons/upCircleArrow";
import { AppConstant } from "../util/constant";

type VirtualizedListProps = {
    data: dataType,
    windowHeight?: number
}
type dataType = {
    dataList: wordDataType[],
    loading: boolean,
    total: number,
}
type wordDataType = {
    name: string,
    acronym: string,
    id: number,
}

const VirtualizedList = (props: VirtualizedListProps) => {
    const { data } = props;
    const rowsPerPage = 20;
    const [perPageHeight, setPerPageHeight] = useState<number>(250);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [dataoffset, setDataoffset] = useState<number>(20);
    const [visibledata, setVisibledata] = useState<dataType>({
        dataList: data.dataList.slice(0, dataoffset),
        loading: data.loading,
        total: data.total
    });
    useEffect(() => {
        // Button is displayed after scrolling for 500 pixels
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        const addRows = () => {
            if (window.scrollY + (window.innerHeight+ 1) >= document.body.offsetHeight) {
                setVisibledata({
                    dataList: [...visibledata.dataList, ...data.dataList.slice(dataoffset, dataoffset + rowsPerPage)],
                    loading: data.loading,
                    total: data.total
                });
                setDataoffset(dataoffset + rowsPerPage);
                setPerPageHeight(perPageHeight + 200);
            }
        }
        window.addEventListener("scroll", () => {
            addRows();
            toggleVisibility();
        });

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [dataoffset]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Row>
            <Table bordered striped hover size="sm">
                <thead>
                    <tr style={{height:'40px'}}>
                        <th>{AppConstant.TABLE_SERIAL}</th>
                        <th>{AppConstant.TABLE_WORD}</th>
                        <th>{AppConstant.TABLE_ACRONYM}</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {data?.dataList?.map((key) => ( */}
                    {visibledata?.dataList?.map((key) => (
                        <tr key={key.acronym + key.id}>
                            <td>{key.id}</td>
                            <td align="center">{key.name}</td>
                            <td align="center">{key.acronym}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {isVisible && (
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id="button-tooltip-2">{AppConstant.SCOLL_TO_TOP}</Tooltip>
                    }
                >
                    {({ ref, ...triggerHandler }) => (
                        <button
                            className="scrollButton"
                            onClick={scrollToTop}
                            {...triggerHandler}
                            ref={ref}
                        >
                            <UpCircleArrow />
                        </button>
                    )}
                </OverlayTrigger>
            )}
        </Row>
    );
};

export default VirtualizedList;