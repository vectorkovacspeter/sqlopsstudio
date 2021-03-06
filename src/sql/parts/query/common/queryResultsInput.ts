/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import { localize } from 'vs/nls';
import { TPromise } from 'vs/base/common/winjs.base';
import { EditorInput } from 'vs/workbench/common/editor';

/**
 * Input for the QueryResultsEditor. This input helps with logic for the viewing and editing of
 * data in the results grid.
 */
export class QueryResultsInput extends EditorInput {

	// Tracks if the editor that holds this input should be visible (i.e. true if a query has been run)
	private _visible: boolean;

	// Tracks if the editor has holds this input has has bootstrapped angular yet
	private _hasBootstrapped: boolean;

	// Holds the HTML content for the editor when the editor discards this input and loads another
	private _editorContainer: HTMLElement;

	constructor(private _uri: string) {
		super();
		this._visible = false;
		this._hasBootstrapped = false;
	}

	getTypeId(): string {
		return QueryResultsInput.ID;
	}

	getName(): string {
		return localize('extensionsInputName', 'Extension');
	}

	matches(other: any): boolean {
		if (other instanceof QueryResultsInput) {
			return (other._uri === this._uri);
		}

		return false;
	}

	resolve(refresh?: boolean): TPromise<any> {
		return TPromise.as(null);
	}

	supportsSplitEditor(): boolean {
		return false;
	}

	public setVisibleTrue(): void {
		this._visible = true;
	}

	public setBootstrappedTrue(): void {
		this._hasBootstrapped = true;
	}

	public dispose(): void {
		this._disposeContainer();
		super.dispose();
	}

	private _disposeContainer() {
		if (!this._editorContainer) {
			return;
		}

		let parentContainer = this._editorContainer.parentNode;
		if (parentContainer) {
			parentContainer.removeChild(this._editorContainer);
			this._editorContainer = null;
		}
	}

	//// Properties

	static get ID() {
		return 'workbench.query.queryResultsInput';
	}

	set container(container: HTMLElement) {
		this._disposeContainer();
		this._editorContainer = container;
	}

	get container(): HTMLElement {
		return this._editorContainer;
	}

	get hasBootstrapped(): boolean {
		return this._hasBootstrapped;
	}

	get visible(): boolean {
		return this._visible;
	}

	get uri(): string {
		return this._uri;
	}

}