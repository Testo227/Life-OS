
const DayBox = ({date}) => {
    return ( 
        <div className="border-2 border-gray-300 rounded-lg p-2">
            <div>
                {date.day}
            </div>
            <div>
                {/* Additional content can go here */}
            </div>
        </div>
     );
}
 
export default DayBox;