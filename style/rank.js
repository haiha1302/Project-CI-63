export const styleRank = `
    <style>
        .menu ul {
            display: inline-flex;
            margin: 50px;
        }
        
        .menu ul li {
            list-style: none;
            margin: 0 20px;
            color: #fffdfd;
            cursor : pointer;
            
        }
        
        .logo {
            margin-top: -40px;
            border: 2px solid transparent;
            border-radius: 10px;
            background-image: linear-gradient(#ffdc62,#ffdc62), radial-gradient(circle at top left, #fd00da,#19d7f8);
            background-origin: border-box;
            background-clip: content-box,border-box;
        }
        
        .logo span {
            display: block;
            padding: 8px 22px;
            font-size: 25px;
            color: #4257b2;
        }
        
        h1{
            display: flex;
            text-align: center;
            flex-direction: column;
            color: #fff;
            font-size: 50px;
        }
        h2 {
            display: flex;
            text-align: center;
            flex-direction: column;
            color: #fff;
        }
        
        .content-table {
            display: flex ;
            flex-direction: column;
            align-items: center;
            border-collapse: collapse;
            margin : 25px 0;
            font-size: 0.9em;
            min-width: 400px;
            border-radius: 5px 5px 0 0;
            overflow: hidden;
        }
        
        .content-table thead tr {
            background-color: #4257b2;
            color : #fff;
            text-align: left;
            font-weight: bold;
        }
        
        .content-table th,
        .content-table td {
            padding: 20px 80px;
        }
        .content-table tbody{
            background : #fff
        }
        .content-table tbody tr img {
            width: 20px;
            height: 20px;
        }
        
        .content-table tbody tr {
            border-bottom: 1px;
            border-left: 2px;
            border-right: 2px;
        }
        
        .content-table tbody tr:nth-of-type(even) {
            background-color: #fff;
        }
        
        .content-table tbody tr:last-of-type {
            border-bottom: 2px;
        }
    </style>
`