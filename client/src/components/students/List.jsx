import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { css } from '@emotion/core';
import { ScaleLoader } from 'react-spinners';

const override = css`
    display:inline;
    margin-top: 0 auto;
    border-color: red;

`;
export default class ListIndex extends React.Component {

	constructor() {
		super();
		this.state = {
			data: '',
			port: '',
			confirmed: 'true',
			deviceID: '',
			confirmedValue: true,
			sending: false
		};

	}



	/* eslint-disable no-unused-vars */

	render() {

		let itemList;
		if (this.props.books && this.props.books.length > 0) {

			const none = <div style={{ "marginLeft": '20px' }}>-</div>

			itemList = this.props.books.map((item) => {

				const none = <div style={{ "paddingLeft": '20px' }}>-</div>
				return (
					<tr key={item.id} className="tableRow" style={{ fontSize: '0.9em' }}>
						<td className="" >{item.name}</td>
						<td className="">{item.roll ? (item.roll || '-') : '-'}</td>
						<td className="">{item.phone ? (item.phone || '-') : '-'}</td>


						<td className="">{item.year ? (item.year || '-') : '-'}</td>
						<td className="">{item.branch ? (item.branch || '-') : '-'}</td>
						<td className="copies">{item.issued ? (item.issued || '-') : '-'}</td>

						<td className="">
							<Link to={"/student/" + item.id} draggable="false" className="">View</Link>



						</td>
					</tr>
				)
			})
		}

		else {
			itemList = (!this.props.fetched) ? <tr key="nodata" style={{ marginTop: '100px' }}>
				<td className="noData" colSpan="6" >
					<div className='sweet-loading' >
						<ScaleLoader
							css={override}
							sizeUnit={"px"}
							color={'#0099cc'}
							size={60}
							height={35}
							width={8}
							radius={2}
							loading={this.state.loading}
						/>
					</div>
				</td>
			</tr>
				:
				<tr key="nodata">
					<td className="noData" colSpan="6">No Student Found!!</td>
				</tr>

		}

		return (
			<div className="pageRow" id="booksBlock">
				<div className="thisBlock">
					<div className="blockBody">
						<div className="thisTable">
							<div className="tbl-header">
								<table>
									<thead>
										<tr>
											<th className="">Name</th>
											<th className="">Roll</th>
											<th className="">Phone</th>
											<th className="">Year</th>
											<th className="">Branch</th>
											<th className="">Issued Books</th>

											<th className=" ">Action</th>
										</tr>
									</thead>
								</table>
							</div>
							<div className="tbl-content">
								<table>
									<tbody>
										{itemList}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

			</div>
		)
	}
}